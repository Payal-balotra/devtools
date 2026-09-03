import Link from "next/link";
import ManageBillingButton from "@/src/components/stripe/ManageBillingButton";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          🎉 Subscription Activated
        </h1>

        <p className="mt-2 text-gray-600">
          Your subscription is now active.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Go to Dashboard
          </Link>

          <ManageBillingButton />
        </div>
      </div>
    </main>
  );
}