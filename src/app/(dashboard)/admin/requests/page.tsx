import { createServerClient } from "@/lib/supabase/server";
import ApproveRejectButtons from "@/components/ApproveRejectButtons";

export default async function OrganizerRequestsPage() {
  const supabase = createServerClient();

  // Fetch pending applications
  const { data: requests } = await supabase
    .from("profiles")
    .select("id, full_name, created_at")
    .eq("applied_for_organizer", true)
    .order("created_at", { ascending: true });

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Organizer Applications</h1>

      {!requests?.length && <p>No pending requests.</p>}

      <ul className="space-y-4">
        {requests?.map((r) => (
          <li key={r.id} className="bg-white border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{r.full_name}</p>
              <p className="text-sm text-gray-500">Applied on {new Date(r.created_at).toLocaleDateString()}</p>
            </div>
            <ApproveRejectButtons userId={r.id} />
          </li>
        ))}
      </ul>
    </section>
  );
}