"use client";

import { useEffect, useState } from "react";
import { adminGetUsers } from "@/src/lib/api/admin";

export default function UsersPage() {
  const [users, setUsers] = useState<
    Array<{ id: number; name: string; email: string; createdAt: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminGetUsers();
      setUsers(data.users);
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? "Failed to load"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Users</h1>
      <p className="mt-2">Manage application users here.</p>

      <button
        onClick={load}
        disabled={loading}
        className="mt-4 rounded border px-4 py-2 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Refresh"}
      </button>

      {error && <p className="mt-3 text-red-600">{error}</p>}

      <table className="mt-6 w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="py-2">{u.id}</td>
              <td className="py-2">{u.name}</td>
              <td className="py-2">{u.email}</td>
              <td className="py-2 text-xs">
                {new Date(u.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
          {!loading && users.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                No users yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
