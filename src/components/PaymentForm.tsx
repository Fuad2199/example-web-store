"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { cartItems } from "../constants";

const PaymentForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async () => {
    try {
      setServerError(null);
      setIsSubmitting(true);

      // Server API çağır → Stripe session yarat
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const { url } = await res.json();

      window.location.href = url;
    } catch (error) {
      console.error(error);
      setServerError("Payment failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-700">Test mod: Stripe Checkout-a yönləndiriləcəksiniz.</p>

      {serverError && (
        <p className="text-xs text-red-600 mt-2">{serverError}</p>
      )}

      <button
        onClick={handlePayment}
        disabled={isSubmitting}
        className="w-full bg-gray-800 hover:bg-gray-900 disabled:opacity-50 transition-all duration-300 text-white p-2 rounded-lg flex items-center justify-center gap-2"
      >
        {isSubmitting ? "Processing..." : "Checkout"}
        <ShoppingCart className="w-3 h-3" />
      </button>
    </div>
  );
};

export default PaymentForm;
