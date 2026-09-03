import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000/api";

export async function serverApi(
  endpoint: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await fetch(
    `${BACKEND_URL}${endpoint}`,
    {
      ...options,

      headers: {
        ...options.headers,
        Cookie: cookieHeader,
      },

      cache: "no-store",
    }
  );

  if (response.status === 401) {
    redirect("/login");
  }

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `API request failed: ${response.status} - ${body}`
    );
  }

  return response.json();
}