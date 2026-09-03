// app/pricing/page.tsx

import CheckoutButton from "@/src/components/stripe/CheckoutButton";

const plans = [
     {
    id: "free",
    name: "Free",
    price: "$0",
    description: "For testing purpose",
    features: [
      "1 projects",
      "Basic analytics",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    price: "$5",
    description: "For individuals getting started",
    features: [
      "5 projects",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$40",
    description: "For users who need more features",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold text-center">
        Choose your plan
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-lg border p-6"
          >
            <h2 className="text-2xl font-semibold">
              {plan.name}
            </h2>

            <p className="mt-2 text-gray-500">
              {plan.description}
            </p>

            <p className="mt-5 text-3xl font-bold">
              {plan.price}
              <span className="text-sm font-normal">
                /month
              </span>
            </p>

            <ul className="mt-5 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature}>
                  ✓ {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <CheckoutButton plan={plan.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}