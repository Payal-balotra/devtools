export default function PricesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Prices
      </h1>

      <p className="mt-2">
        Manage Stripe prices here.
      </p>

      <div className="mt-6 flex gap-3">
        <button className="rounded border px-4 py-2">
          Get Prices
        </button>

        <button className="rounded border px-4 py-2">
          Create Price
        </button>
      </div>
    </div>
  );
}