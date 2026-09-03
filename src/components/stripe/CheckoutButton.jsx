"use client";

import { useState } from "react";
import { createCheckoutSession } from "@/src/lib/api/subscription";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const data = await createCheckoutSession();

      if (!data.url) {
        throw new Error("Checkout URL not received");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="rounded-md bg-black px-4 py-2 text-white"
    >
      {loading ? "Redirecting..." : "Subscribe"}
    </button>
  );
}