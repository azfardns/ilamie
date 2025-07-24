import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default async function LoginPage() {
  const supabase = createServerClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/");

  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <AuthForm mode="register" />
    </div>
  );
}