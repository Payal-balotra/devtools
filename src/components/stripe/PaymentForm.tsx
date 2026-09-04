"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "@/src/lib/api/payment";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm({ onSuccess }: { onSuccess?: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (error) {
      setError(error.message ?? "Payment failed");
      setSubmitting(false);
      return;
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        type="submit"
        disabled={!stripe || submitting}
        style={{ marginTop: 16 }}
      >
        {submitting ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}

export default function PaymentForm({
  amount,
  description,
  promotionCode,
}: {
  amount: number;
  description?: string;
  promotionCode?: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent({ amount, description, promotionCode })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => setError(err.response?.data?.message ?? "Failed"));
  }, [amount, description, promotionCode]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!clientSecret) return <p>Loading...</p>;

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: { theme: "stripe" } }}
    >
      <CheckoutForm />
    </Elements>
  );
}
