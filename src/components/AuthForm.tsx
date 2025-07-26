"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) setError(error.message);
    else router.push("/");
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg 
                     text-gray-900 placeholder-gray-500 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#25c226] focus:border-transparent
                     transition-all duration-200 hover:border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg 
                     text-gray-900 placeholder-gray-500 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#25c226] focus:border-transparent
                     transition-all duration-200 hover:border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#25c226] text-white py-3 px-4 rounded-lg text-sm font-medium
                   hover:bg-[#19a01a] active:bg-[#177e19] 
                   transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                   focus:outline-none focus:ring-2 focus:ring-[#25c226] focus:ring-offset-2
                   shadow-sm hover:shadow-md"
        >
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>
    </div>
  );
}