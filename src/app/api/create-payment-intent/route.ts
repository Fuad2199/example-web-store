
import { CartItemsType } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      items: CartItemsType
      customerEmail?: string
    }

    const { items, customerEmail } = body

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    /**
     * ⚠️ REAL PRODUCTION:
     * price DB-dən oxunmalıdır
     */
    const amount = items.reduce((total, item) => {
      if (item.quantity <= 0) {
        throw new Error('Invalid quantity')
      }

      return total + item.price * item.quantity
    }, 0)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      receipt_email: customerEmail,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(
          items.map((i) => ({
            id: i.id,
            qty: i.quantity,
          }))
        ),
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Internal server error'

    console.error('Create PaymentIntent error:', message)

    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
