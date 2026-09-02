"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { axiosClient } from "../lib/axios";
import { PROJECT_ENDPOINTS } from "../endpoints";

const DeleteProjectButton = ({ projectId }: { projectId: number }) => {
  const router = useRouter();

  const handleDeleteProject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      await axiosClient.delete(
        PROJECT_ENDPOINTS.DELETE_PROJECT.replace(
          ":id",
          projectId.toString()
        )
      );

      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <button
      className="rounded bg-red-500 px-4 py-2 text-white"
      onClick={handleDeleteProject}
    >
      Delete Project
    </button>
  );
};

export default DeleteProjectButton;