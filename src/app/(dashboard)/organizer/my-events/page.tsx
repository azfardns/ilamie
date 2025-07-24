import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteEventButton from "@/components/DeleteEventButton";

export default async function MyEventsPage() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: events } = await supabase
    .from("events")
    .select("*, venue:venues(name)")
    .eq("organizer_id", user?.id)
    .order("starts_at", { ascending: true });

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <Link
        href="/organizer/create"
        className="mb-4 inline-block bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        + Create Event
      </Link>

      {!events?.length && <p>No events yet.</p>}

      <ul className="space-y-4">
        {events?.map((ev) => (
          <li key={ev.id} className="border p-4 rounded flex justify-between">
            <div>
              <p className="font-semibold">{ev.title}</p>
              <p className="text-sm text-gray-600">
                {new Date(ev.starts_at).toLocaleString("en-MY")} · {ev.venue.name}
              </p>
            </div>
            <div className="space-x-2">
              <Link
                href={`/organizer/edit/${ev.id}`}
                className="text-emerald-600 hover:underline"
              >
                Edit
              </Link>
              <DeleteEventButton eventId={ev.id} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}