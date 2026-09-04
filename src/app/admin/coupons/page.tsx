"use client";

import { useState } from "react";
import { createCoupon } from "@/src/lib/api/coupon";

export default function CouponsPage() {
  const [type, setType] = useState<"percent" | "amount">("percent");
  const [percentOff, setPercentOff] = useState("20");
  const [amountOff, setAmountOff] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [duration, setDuration] =
    useState<"once" | "forever" | "repeating">("once");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    couponId: string;
    code: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await createCoupon({
        percentOff: type === "percent" ? Number(percentOff) : undefined,
        amountOff: type === "amount" ? Number(amountOff) : undefined,
        currency: type === "amount" ? currency : undefined,
        duration,
        code,
      });

      setResult({
        couponId: data.coupon.id,
        code: data.promotionCode.code,
      });
      setCode("");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Failed to create coupon";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold">Coupons</h1>
      <p className="mt-2 text-gray-600">
        Create a Stripe coupon and a customer-facing promotion code in one
        step. Users can type the code at checkout.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="SUMMER20"
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={type === "percent"}
                onChange={() => setType("percent")}
              />
              Percent off
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={type === "amount"}
                onChange={() => setType("amount")}
              />
              Amount off
            </label>
          </div>
        </div>

        {type === "percent" ? (
          <div>
            <label className="mb-1 block text-sm font-medium">
              Percent off (1-100)
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={percentOff}
              onChange={(e) => setPercentOff(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">
                Amount off (cents)
              </label>
              <input
                type="number"
                min={1}
                value={amountOff}
                onChange={(e) => setAmountOff(e.target.value)}
                required
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div className="w-28">
              <label className="mb-1 block text-sm font-medium">
                Currency
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded border px-3 py-2 lowercase"
              />
            </div>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Duration</label>
          <select
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value as "once" | "forever" | "repeating")
            }
            className="w-full rounded border px-3 py-2"
          >
            <option value="once">Once</option>
            <option value="forever">Forever</option>
            <option value="repeating">Repeating</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !code}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create coupon"}
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded border border-green-300 bg-green-50 p-4">
          <p className="font-medium">Coupon created</p>
          <p className="text-sm text-gray-700">
            Code: <code>{result.code}</code>
          </p>
          <p className="text-sm text-gray-700">
            Coupon ID: <code>{result.couponId}</code>
          </p>
        </div>
      )}

      {error && (
        <p className="mt-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
