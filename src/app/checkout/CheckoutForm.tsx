"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PayForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const pay = async () => {
    if (!stripe || !elements) return;

    // 1. PaymentIntent yarat
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await res.json();

    // 2. Kart elementi
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    // 3. Ödənişi təsdiqlə
    const { error, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Fuad",
          },
        },
      });

    if (error) {
      console.error(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      console.log("Payment successful");
    }
  };

  return (
    <>
      <CardElement />
      <button onClick={pay}>Pay</button>
    </>
  );
}

export default function CheckoutForm({ amount }: { amount: number }) {
  return (
    <Elements stripe={stripePromise}>
      <PayForm amount={amount} />
    </Elements>
  );
}
