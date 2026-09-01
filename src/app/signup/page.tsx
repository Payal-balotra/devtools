"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {axiosClient}  from "@/src/lib/axios";
import { AUTH_ENDPOINTS } from "@/src/endpoints";

export default function SignupPage() {
  const router = useRouter();
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axiosClient.post(AUTH_ENDPOINTS.REGISTER, {
        name,
        email,
        password,
    
      });

      const data = await response.data;

      if (!response) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // Redirect after successful login
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-lg border p-6"
      >
        <h1 className="text-2xl font-bold">Sign Up</h1>

        {error && (
          <p className="rounded bg-red-100 p-3 text-sm text-red-600">
            {error}
          </p>
        )}
        {/* this is comment  */}
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}