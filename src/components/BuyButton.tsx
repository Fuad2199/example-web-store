'use client';

import { useRouter } from 'next/navigation';

export default function BuyButton() {
  const router = useRouter();

  const handleCheckout = async () => {
    // 1️⃣ Serverdə PaymentIntent yarat
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 'basic' }),
    });

    const { clientSecret } = await res.json();

    if (!clientSecret) {
      throw new Error('Failed to create payment intent');
    }

    // 2️⃣ Checkout səhifəsinə keç
    router.push(`/checkout?clientSecret=${clientSecret}`);
  };

  return <button onClick={handleCheckout}>Pay</button>;
}
