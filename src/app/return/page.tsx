import { redirect } from 'next/navigation'
import { stripe } from '../../../lib/stripe'

type ReturnProps = {
  searchParams: {
    session_id?: string
  }
}

export default async function Return({ searchParams }: ReturnProps) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  // Stripe session retrieve
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'payment_intent']
  })

  const status: string | null = session.status
  const customerEmail: string | null = session.customer_details?.email ?? null

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail ?? 'your email'}. If you have any questions, please email{' '}
        </p>
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </section>
    )
  }

  // Fallback status
  return <p>Payment status: {status}</p>
}
