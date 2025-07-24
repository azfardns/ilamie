import { createServerClient } from "@/lib/supabase/server";
import RequestOrganizerButton from "@/components/RequestOrganizerButton";

export default async function AccountPage() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, applied_for_organizer")
    .eq("id", user?.id)
    .single();

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      <p className="mb-4">Role: <span className="font-semibold">{profile?.role}</span></p>

      {profile?.role === "user" && !profile.applied_for_organizer && (
        <RequestOrganizerButton userId={user!.id} />
      )}

      {profile?.applied_for_organizer && (
        <p className="text-sm text-emerald-700">Your request is pending admin review.</p>
      )}
    </section>
  );
}