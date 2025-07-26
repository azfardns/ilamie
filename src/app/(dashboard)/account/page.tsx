import { createServerClient } from "@/lib/supabase/server";
import OrganizerApplicationForm from "@/components/OrganizerApplicationForm";

export default async function AccountPage({ searchParams }: { searchParams: { submitted?: string } }) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, applied_for_organizer")
    .eq("id", user.id)
    .single();

  // Has the user already applied?
  const { data: existingApp } = await supabase
    .from("organizer_applications")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      {searchParams.submitted && (
        <p className="mb-4 text-emerald-700">
          Your application has been submitted and will be reviewed within 3 days.
        </p>
      )}

      {profile?.role === "user" && !existingApp && (
        <>
          <h2 className="text-lg font-semibold mb-2">Apply to become an organizer</h2>
          <OrganizerApplicationForm />
        </>
      )}

      {existingApp && (
        <p className="text-emerald-700">Your application is under review.</p>
      )}
    </section>
  );
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quidem ex minus illum quia sed nobis labore ducimus quasi dolore, non doloremque voluptatum eveniet odit blanditiis, nisi eum nulla molestiae.