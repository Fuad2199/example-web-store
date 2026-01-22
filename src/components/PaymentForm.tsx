"use client";

<<<<<<< HEAD
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
=======
import { SubmitHandler, useForm } from "react-hook-form";
import { PaymentFormInputs, paymentFormSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = async (data) => {
    try {
      setServerError(null);

      // 🔒 MOCK payment request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Payment data (mock):", data);

      reset();

      // uğurlu ödənişdən sonra
      router.push("/success");
    } catch (error) {
      console.error("Payment error:", error);
      setServerError("Payment failed. Please try again.");
>>>>>>> eb26e67de2bf53982a88c314700a89d25f93a6f6
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-4">
      <p className="text-gray-700">Test mod: Stripe Checkout-a yönləndiriləcəksiniz.</p>
=======
    <form
      onSubmit={handleSubmit(handlePaymentForm)}
      className="flex flex-col gap-4"
    >
      {/* Card Holder */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cardHolder" className="text-xs text-gray-500 font-medium">
          Name on card
        </label>
        <input
          id="cardHolder"
          type="text"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          placeholder="John Doe"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-xs text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>

      {/* Card Number */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cardNumber" className="text-xs text-gray-500 font-medium">
          Card Number
        </label>
        <input
          id="cardNumber"
          type="text"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          placeholder="4242 4242 4242 4242"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>

      {/* Expiration Date */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="expirationDate"
          className="text-xs text-gray-500 font-medium"
        >
          Expiration Date
        </label>
        <input
          id="expirationDate"
          type="text"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          placeholder="MM/YY"
          {...register("expirationDate")}
        />
        {errors.expirationDate && (
          <p className="text-xs text-red-500">
            {errors.expirationDate.message}
          </p>
        )}
      </div>

      {/* CVV */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
          CVV
        </label>
        <input
          id="cvv"
          type="password"
          className="border-b border-gray-200 py-2 outline-none text-sm"
          placeholder="123"
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-xs text-red-500">{errors.cvv.message}</p>
        )}
      </div>

      {/* Payment providers */}
      <div className="flex items-center gap-2 mt-4">
        <Image src="/klarna.png" alt="klarna" width={50} height={25} />
        <Image src="/cards.png" alt="cards" width={50} height={25} />
        <Image src="/stripe.png" alt="stripe" width={50} height={25} />
      </div>
>>>>>>> eb26e67de2bf53982a88c314700a89d25f93a6f6

      {serverError && (
        <p className="text-xs text-red-600 mt-2">{serverError}</p>
      )}

      <button
<<<<<<< HEAD
        onClick={handlePayment}
=======
        type="submit"
>>>>>>> eb26e67de2bf53982a88c314700a89d25f93a6f6
        disabled={isSubmitting}
        className="w-full bg-gray-800 hover:bg-gray-900 disabled:opacity-50 transition-all duration-300 text-white p-2 rounded-lg flex items-center justify-center gap-2"
      >
        {isSubmitting ? "Processing..." : "Checkout"}
        <ShoppingCart className="w-3 h-3" />
      </button>
<<<<<<< HEAD
    </div>
=======
    </form>
>>>>>>> eb26e67de2bf53982a88c314700a89d25f93a6f6
  );
};

export default PaymentForm;
