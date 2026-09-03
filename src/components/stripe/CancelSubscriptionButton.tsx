"use client";

import { useState } from "react";
import {cancelSubscription  } from "@/src/lib/api/subscription";




export default function CancelSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);

      await cancelSubscription();

      alert("Subscription cancelled");
    } catch (error) {
      console.error("Cancel subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
    >
      {loading ? "Cancelling..." : "Cancel Subscription"}
    </button>
  );
}