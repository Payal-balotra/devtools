import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getProjectById(id: string) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

const response = await fetch(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/getById/${id}`,
  {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  }
);


const body = await response.text();


if (response.status === 401) {
  redirect("/login");
}

if (!response.ok) {
  throw new Error(
    `Failed to fetch project: ${response.status} - ${body}`
  );
}

return JSON.parse(body);

 
}