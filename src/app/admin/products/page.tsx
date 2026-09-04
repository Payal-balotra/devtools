"use client";

import { useEffect, useState } from "react";
import { adminGetProducts, adminCreateProduct } from "@/src/lib/api/admin";

export default function ProductsPage() {
  const [products, setProducts] = useState<
    Array<{ id: string; name: string; description: string | null; active: boolean }>
  >([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await adminGetProducts();
      setProducts(data.products);
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
      await adminCreateProduct({ name, description: description || undefined });
      setName("");
      setDescription("");
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
      <h1 className="text-3xl font-bold">Products</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex max-w-xl flex-col gap-3 rounded border p-4"
      >
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create product"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      <h2 className="mt-8 text-xl font-semibold">All products</h2>
      <table className="mt-3 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Description</th>
            <th className="py-2">Active</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2 font-mono text-xs">{p.id}</td>
              <td className="py-2">{p.name}</td>
              <td className="py-2">{p.description ?? "-"}</td>
              <td className="py-2">{p.active ? "yes" : "no"}</td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                No products yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
