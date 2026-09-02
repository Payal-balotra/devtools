"use client";

import { useState } from "react";
import { axiosClient } from "../lib/axios";
import { PROJECT_ENDPOINTS } from "../endpoints";
import {useRouter} from "next/navigation";



const CreateProjectForm = () => {
    const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  const handleCreateProject = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post(
        PROJECT_ENDPOINTS.CREATE_PROJECT,
        {
          name,
          description,
        }
      );

      console.log("Project created:", response.data);

      // Clear form
      setName("");
      
      setDescription("");
      router.push("/dashboard");
    } catch (error) {
      console.error("Create project failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleCreateProject}
      className="mt-6 space-y-4"
    >
      <div>
        <label className="block mb-2">
          Project Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          className="border p-2"
        />
      </div>

      <div>
        <label className="block mb-2">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          className="border p-2"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Create Project
      </button>
    </form>
  );
};

export default CreateProjectForm;