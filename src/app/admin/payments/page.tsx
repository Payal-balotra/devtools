"use client";

import { useEffect, useState } from "react";
import {
  adminGetPayments,
  adminRefundPayment,
} from "@/src/lib/api/admin";

type Payment = {
  id: number;
  userId: number;
  stripeCustomerId: string | null;
  stripePaymentIntentId: string;
  amount: number;
  amountRefunded: number;
  currency: string;
  status: string;
  description: string | null;
  receiptUrl: string | null;
  failureMessage: string | null;
  promotionCode: string | null;
  createdAt: string;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refundAmount, setRefundAmount] = useState<Record<number, string>>({});
  const [refundReason, setRefundReason] = useState<Record<number, string>>({});
  const [actionId, setActionId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminGetPayments();
      setPayments(data.payments);
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

  const handleRefund = async (p: Payment) => {
    const amount = refundAmount[p.id];
    const reason = refundReason[p.id] || "requested_by_customer";
    setActionId(p.id);
    try {
      await adminRefundPayment({
        paymentIntentId: p.stripePaymentIntentId,
        amount: amount ? Number(amount) : undefined,
        reason: reason as
          | "duplicate"
          | "fraudulent"
          | "requested_by_customer",
      });
      setRefundAmount((s) => ({ ...s, [p.id]: "" }));
      await load();
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Refund failed"
      );
    } finally {
      setActionId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Payments</h1>
      {error && <p className="mt-2 text-red-600">{error}</p>}

      <table className="mt-6 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">User</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Status</th>
            <th className="py-2">Code</th>
            <th className="py-2">Created</th>
            <th className="py-2">Refund</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => {
            const remaining = p.amount - p.amountRefunded;
            return (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.id}</td>
                <td className="py-2">{p.userId}</td>
                <td className="py-2">
                  {(p.amount / 100).toFixed(2)} {p.currency.toUpperCase()}
                  {p.amountRefunded > 0 && (
                    <div className="text-xs text-gray-500">
                      refunded {p.amountRefunded / 100}
                    </div>
                  )}
                </td>
                <td className="py-2">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                    {p.status}
                  </span>
                  {p.failureMessage && (
                    <div className="text-xs text-red-600">
                      {p.failureMessage}
                    </div>
                  )}
                </td>
                <td className="py-2 text-xs">
                  {p.promotionCode ?? "-"}
                </td>
                <td className="py-2 text-xs">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
                <td className="py-2">
                  {remaining > 0 && p.status === "succeeded" ? (
                    <div className="flex flex-col gap-1">
                      <input
                        type="number"
                        placeholder={`max ${remaining / 100}`}
                        value={refundAmount[p.id] ?? ""}
                        onChange={(e) =>
                          setRefundAmount((s) => ({
                            ...s,
                            [p.id]: e.target.value,
                          }))
                        }
                        className="w-24 rounded border px-2 py-1 text-xs"
                      />
                      <select
                        value={refundReason[p.id] ?? "requested_by_customer"}
                        onChange={(e) =>
                          setRefundReason((s) => ({
                            ...s,
                            [p.id]: e.target.value,
                          }))
                        }
                        className="rounded border px-2 py-1 text-xs"
                      >
                        <option value="requested_by_customer">
                          requested_by_customer
                        </option>
                        <option value="duplicate">duplicate</option>
                        <option value="fraudulent">fraudulent</option>
                      </select>
                      <button
                        onClick={() => handleRefund(p)}
                        disabled={actionId === p.id}
                        className="rounded border border-red-300 px-2 py-1 text-xs text-red-700 disabled:opacity-50"
                      >
                        {actionId === p.id ? "..." : "Refund"}
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>
              </tr>
            );
          })}
          {!loading && payments.length === 0 && (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                No payments
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
