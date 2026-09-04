"use client";

import { useState } from "react";
import { createPortalSession } from "@/src/lib/api/subscription";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function ManageBillingButton() {
  const [loading, setLoading] = useState(false);

  const handleManageBilling = async () => {
    try {
      setLoading(true);

      const data = await createPortalSession();

      if (!data.url) {
        throw new Error("Billing portal URL not received");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Billing portal error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
     

    <button
      onClick={handleManageBilling}
      disabled={loading}
      className="rounded-md bg-black px-4 py-2 text-white"
    >
      
      {loading ? "Opening..." : "Manage Billing"}
    </button>
  );
}