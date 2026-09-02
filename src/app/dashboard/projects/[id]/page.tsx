import { axiosClient } from "@/src/lib/axios";
import { PROJECT_ENDPOINTS } from "@/src/endpoints";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetails({ params }: Props) {
  const { id } = await params;
  console.log("project id:", id); // This will now print: 1 
  const response = await axiosClient.get(
    `${PROJECT_ENDPOINTS.GET_PROJECT_BY_ID}/${id}`
  );
  console.log("response data:", response.data); // This will now print: [{ id: 1, name: "Project 1", description: "Description of Project 1" }]
  // FIX: Access the first item in the array
  const project = response.data.project; 

  // Guard clause in case the backend returns an empty array
  if (!project) {
    return <div className="p-10">Project not found</div>;
  }

  console.log("project:", project.id); // This will now print: 1

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
    </div>
  );
}
