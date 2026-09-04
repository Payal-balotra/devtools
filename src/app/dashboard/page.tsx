import Link from "next/link";
import {
  AUTH_ENDPOINTS,
  SUBSCRIPTION_ENDPOINTS,
} from "@/src/endpoints";

import { serverApi } from "@/src/lib/server.api";

import LogoutButton from "@/src/components/LogoutButton";
import CheckoutButton from "@/src/components/stripe/CheckoutButton";
import ManageBillingButton from "@/src/components/stripe/ManageBillingButton";
import PricingPage from "../pricing/page";

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
  let isAdmin = false;
  const user = userResponse.user;

  const projects = projectsResponse.projects;

  const subscription = subscriptionResponse.subscription;

  const isSubscribed = subscription?.status === "active";

  if(user.role === "admin"){
      isAdmin = true;
  }

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
          <div className="mt-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Choose your plan
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Upgrade to Pro to unlock more features.
              </p>
            </div>

            <PricingPage />
          </div>
        )}

      </div>

          

      {/* Projects Header */}

      {/* Projects Header */}

      <div className="mt-10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Your Projects
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage and view your projects
          </p>
        </div>

        <Link
          href="/dashboard/projects/create"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Create Project
        </Link>
      </div>


      {/* Projects */}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {projects.map((project: any) => (
          <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
          >
            {/* Project Header */}

            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-semibold text-gray-700">
                {project.name?.charAt(0).toUpperCase()}
              </div>

              <span className="text-sm text-gray-400">
                #{project.id}
              </span>
            </div>


            {/* Project Info */}

            <div className="mt-5">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black">
                {project.name}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                {project.description || "No description provided."}
              </p>
            </div>


            {/* Footer */}

            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <span className="text-xs text-gray-400">
                Project
              </span>

              <span className="text-sm font-medium text-gray-700 group-hover:underline">
                Open project →
              </span>
            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}