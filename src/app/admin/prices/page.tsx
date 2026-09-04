"use client";

import { useEffect, useState } from "react";
import {
  adminGetPrices,
  adminCreatePrice,
  adminGetProducts,
} from "@/src/lib/api/admin";

export default function PricesPage() {
  const [prices, setPrices] = useState<
    Array<{
      id: string;
      product: string | { id: string; name: string };
      unit_amount: number | null;
      currency: string;
      active: boolean;
      recurring?: { interval: string } | null;
    }>
  >([]);
  const [products, setProducts] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [productId, setProductId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [interval, setInterval] = useState<"day" | "week" | "month" | "year">("month");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const [p, pr] = await Promise.all([adminGetProducts(), adminGetPrices()]);
      setProducts(p.products.map((x) => ({ id: x.id, name: x.name })));
      setPrices(pr.prices);
      if (p.products[0] && !productId) setProductId(p.products[0].id);
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Failed to load"
      );
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminCreatePrice({
        productId,
        amount: Number(amount),
        currency,
        interval,
      });
      setAmount("");
      await load();
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Failed to create"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Prices</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid max-w-2xl grid-cols-2 gap-3 rounded border p-4"
      >
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="rounded border px-3 py-2"
          required
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount in cents"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value.toLowerCase())}
          className="rounded border px-3 py-2"
        />
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value as typeof interval)}
          className="rounded border px-3 py-2"
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="col-span-2 rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create price"}
        </button>
        {error && (
          <p className="col-span-2 text-sm text-red-600">{error}</p>
        )}
      </form>

      <h2 className="mt-8 text-xl font-semibold">All active prices</h2>
      <table className="mt-3 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Product</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Currency</th>
            <th className="py-2">Interval</th>
            <th className="py-2">Active</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2 font-mono text-xs">{p.id}</td>
              <td className="py-2 font-mono text-xs">
                {typeof p.product === "string" ? p.product : p.product.id}
              </td>
              <td className="py-2">
                {p.unit_amount != null ? (p.unit_amount / 100).toFixed(2) : "-"}
              </td>
              <td className="py-2 uppercase">{p.currency}</td>
              <td className="py-2">{p.recurring?.interval ?? "-"}</td>
              <td className="py-2">{p.active ? "yes" : "no"}</td>
            </tr>
          ))}
          {prices.length === 0 && (
            <tr>
              <td colSpan={6} className="py-4 text-center text-gray-500">
                No prices yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
