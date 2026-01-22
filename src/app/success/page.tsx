import { stripe } from "../../../lib/stripe"

type SuccessProps = {
  searchParams: { session_id?: string } | Promise<{ session_id?: string }>
}

export default async function Success({ searchParams }: SuccessProps) {
  const params = await searchParams
  const sessionId = params.session_id

  if (!sessionId) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  // Stripe session cavabını type-safe şəkildə retrieve edirik
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'payment_intent']
  })

  const status: string | null = session.status
  const customerEmail: string | null = session.customer_details?.email ?? null

  if (status === 'open') {
    return null; // hələ ödəniş tamamlanmayıb
  }

  if (status === 'complete') {

    await fetch('/api/send-success-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: customerEmail,
      subject: 'Your Order Confirmation',
      text: `Thank you for your order! We have received your payment.`
    }),
  });

    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail ?? 'your email'}. If you have any questions, please email{' '}
        </p>
        <a href="mailto:fbeybutov99@gmail.com">orders@example.com</a>.
      </section>
    )
  }

  // Status qeyri-müəyyən olarsa, fallback
  return <p>Payment status: {status}</p>
}
