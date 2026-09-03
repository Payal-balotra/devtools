import Link from "next/link";
import {
  AUTH_ENDPOINTS,
  SUBSCRIPTION_ENDPOINTS,
} from "@/src/endpoints";

import { serverApi } from "@/src/lib/server.api";

import LogoutButton from "@/src/components/LogoutButton";
import CheckoutButton from "@/src/components/stripe/CheckoutButton";
import ManageBillingButton from "@/src/components/stripe/ManageBillingButton";

export default async function Dashboard() {
  const [
    userResponse,
    projectsResponse,
    subscriptionResponse,
  ] = await Promise.all([
    serverApi(AUTH_ENDPOINTS.ME),

    serverApi(AUTH_ENDPOINTS.PROJECTS),

    serverApi(
      SUBSCRIPTION_ENDPOINTS.GET_SUBSCRIPTION
    ),
  ]);

  const user = userResponse.user;

  const projects =
    projectsResponse.projects;

  const subscription =
    subscriptionResponse.subscription;

  const isSubscribed =
    subscription?.status === "active";

  return (
    <div className="min-h-screen p-10">

      {/* User Information */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {user.name}
          </h1>

          <p className="text-gray-500">
            {user.email}
          </p>
        </div>

        <LogoutButton />
      </div>


      {/* Subscription */}

      <div className="mt-10 rounded-lg border p-6">

        <h2 className="text-xl font-semibold">
          Subscription
        </h2>

        {isSubscribed ? (
          <div className="mt-4">

            <div className="flex items-center gap-3">

              <span className="text-lg font-semibold">
                Pro Plan
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                Active
              </span>

            </div>

            <p className="mt-2 text-gray-500">
              Your Pro subscription is active.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Renews on{" "}
              {new Date(
                subscription.currentPeriodEnd
              ).toLocaleDateString()}
            </p>

            <div className="mt-5">
              <ManageBillingButton />
            </div>

          </div>
        ) : (
          <div className="mt-4">

            <p className="text-gray-500">
              Upgrade to Pro to unlock more features.
            </p>

            <div className="mt-4">
              <CheckoutButton />
            </div>

          </div>
        )}

      </div>


      {/* Projects Header */}

      <div className="mt-10 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Your Projects
        </h2>

        <Link
          href="/dashboard/projects/create"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Create Project
        </Link>

      </div>


      {/* Projects */}

      <div className="mt-5 grid gap-4">

        {projects.map((project: any) => (
          <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            className="rounded-lg border p-5 hover:bg-gray-50"
          >

            <h3 className="font-semibold">
              {project.name}
            </h3>

            <p className="text-gray-500">
              {project.description}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
}