import { axiosClient } from "@/src/lib/axios";
import { PROJECT_ENDPOINTS } from "@/src/endpoints";
import DeleteProjectButton from "@/src/components/DeleteProjectButton";
import { serverApi } from "@/src/lib/server.api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetails({ params }: Props) {
  const { id } = await params;

  console.log("project id:", id);

  const data = await serverApi(
    PROJECT_ENDPOINTS.GET_PROJECT_BY_ID(id)
  );

  const project = data.project;

  if (!project) {
    return <div className="p-10">Project not found</div>;
  }



  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        {project.name}
      </h1>

      <p className="mt-4">
        {project.description}
      </p>

      <p className="mt-4">
        Project ID: {project.id}
      </p>

      <div className="mt-6">
        <DeleteProjectButton projectId={project.id} />
      </div>
    </div>
  );
}
    