export default function SubscriptionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Subscriptions
      </h1>

      <p className="mt-2">
        Manage customer subscriptions here.
      </p>

      <div className="mt-6 flex gap-3">
        <button className="rounded border px-4 py-2">
          Get Subscriptions
        </button>

        <button className="rounded border px-4 py-2">
          Change Plan
        </button>

        <button className="rounded border px-4 py-2">
          Cancel Subscription
        </button>
      </div>
    </div>
  );
}