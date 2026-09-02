"use client";

import { useRouter } from "next/navigation";
import { axiosClient } from "@/src/lib/axios";
import { AUTH_ENDPOINTS } from "@/src/endpoints";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axiosClient.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-800 disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}