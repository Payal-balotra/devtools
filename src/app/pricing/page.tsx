import CheckoutButton from "@/components/stripe/CheckoutButton";

export default function PricingPage() {
  return (
    <main>
      <h1>Pricing</h1>

      <div>
        <h2>Pro Plan</h2>

        <p>$20 / month</p>

        <CheckoutButton />
      </div>
    </main>
  );
}