"use client";

import { useEffect, useState } from "react";
import {
  adminGetSubscriptions,
  adminChangeSubscriptionPlan,
  adminCancelSubscription,
  adminGetPrices,
} from "@/src/lib/api/admin";

type Sub = {
  subscriptionId: number;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  userId: number;
  userName: string;
  userEmail: string;
  status: string;
  priceId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
};

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [prices, setPrices] = useState<Array<{ id: string; unit_amount: number | null; currency: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [s, p] = await Promise.all([
        adminGetSubscriptions(),
        adminGetPrices(),
      ]);
      setSubs(s.subscriptions);
      setPrices(
        p.prices.map((x) => ({
          id: x.id,
          unit_amount: x.unit_amount,
          currency: x.currency,
        }))
      );
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Failed to load"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChangePlan = async (id: number) => {
    if (!newPrice) return;
    setActionId(id);
    try {
      await adminChangeSubscriptionPlan(id, newPrice);
      setNewPrice("");
      await load();
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Failed to change plan"
      );
    } finally {
      setActionId(null);
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm("Cancel this subscription?")) return;
    setActionId(id);
    try {
      await adminCancelSubscription(id);
      await load();
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Failed to cancel"
      );
    } finally {
      setActionId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Subscriptions</h1>
      {error && <p className="mt-2 text-red-600">{error}</p>}

      <table className="mt-6 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">User</th>
            <th className="py-2">Status</th>
            <th className="py-2">Price</th>
            <th className="py-2">Period</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((s) => (
            <tr key={s.subscriptionId} className="border-b">
              <td className="py-2">{s.subscriptionId}</td>
              <td className="py-2">
                {s.userName}
                <br />
                <span className="text-xs text-gray-500">{s.userEmail}</span>
              </td>
              <td className="py-2">
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  {s.status}
                </span>
              </td>
              <td className="py-2 font-mono text-xs">{s.priceId}</td>
              <td className="py-2 text-xs">
                {new Date(s.currentPeriodStart).toLocaleDateString()} →{" "}
                {new Date(s.currentPeriodEnd).toLocaleDateString()}
              </td>
              <td className="py-2">
                <div className="flex flex-col gap-1">
                  <select
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="rounded border px-2 py-1 text-xs"
                  >
                    <option value="">Change to...</option>
                    {prices.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.id} ({p.unit_amount != null ? p.unit_amount / 100 : "?"} {p.currency})
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleChangePlan(s.subscriptionId)}
                      disabled={!newPrice || actionId === s.subscriptionId}
                      className="rounded border px-2 py-1 text-xs disabled:opacity-50"
                    >
                      Change
                    </button>
                    <button
                      onClick={() => handleCancel(s.subscriptionId)}
                      disabled={actionId === s.subscriptionId}
                      className="rounded border border-red-300 px-2 py-1 text-xs text-red-700 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
          {!loading && subs.length === 0 && (
            <tr>
              <td colSpan={6} className="py-4 text-center text-gray-500">
                No subscriptions
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
