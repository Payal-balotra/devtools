import Link from "next/link";
import { axiosClient } from "@/src/lib/axios";
import { AUTH_ENDPOINTS } from "@/src/endpoints";
import { cookies } from "next/headers";
import LogoutButton from "@/src/components/LogoutButton";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const [userResponse, projectsResponse] = await Promise.all([
    axiosClient.get(AUTH_ENDPOINTS.ME, { headers: { Cookie: cookieHeader } }),
    axiosClient.get(AUTH_ENDPOINTS.PROJECTS, { headers: { Cookie: cookieHeader } }),
  ]);

  const user = userResponse.data;
  const projects = projectsResponse.data.projects;
  console.log("project:", projects);

  return (
    <div className="min-h-screen p-10">

      {/* User Information */}
       <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <LogoutButton />
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