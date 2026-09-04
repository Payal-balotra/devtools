export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Products
      </h1>

      <p className="mt-2">
        Manage Stripe products here.
      </p>

      <div className="mt-6 flex gap-3">
        <button className="rounded border px-4 py-2">
          Get Products
        </button>

        <button className="rounded border px-4 py-2">
          Create Product
        </button>
      </div>
    </div>
  );
}