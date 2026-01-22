
import { CartItemType } from "@/types"
import { NextResponse } from "next/server"
import { stripe } from "../../../../lib/stripe"

export async function POST(req: Request) {
  const { items }: { items: CartItemType[] } = await req.json()

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
  }

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        metadata: {
          productId: item.id,
          size: item.selectedSize || "",
          color: item.selectedColor || "",
        },
      },
      unit_amount: Math.round(item.price * 100), // 💡 cents
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
  })

  return NextResponse.json({ url: session.url })
}
