import { createServerClient } from "@/lib/supabase/server";
import ApproveRejectButtons from "@/components/ApproveRejectButtons";

export default async function ApplicationsPage() {
  const supabase = createServerClient();
  const { data: apps } = await supabase
    .from("organizer_applications")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Organizer Applications</h1>
      {apps?.length === 0 && <p>No applications yet.</p>}
      <ul className="space-y-4">
        {apps?.map((a) => (
          <li key={a.id} className="bg-white border p-4 rounded">
            <p className="font-semibold">{a.full_legal_name}</p>
            <p>{a.mosque_org} — {a.phone}</p>
            <p className="mt-2 text-sm">{a.reason}</p>
            <ApproveRejectButtons userId={a.user_id} />
          </li>
        ))}
      </ul>
    </section>
  );
}