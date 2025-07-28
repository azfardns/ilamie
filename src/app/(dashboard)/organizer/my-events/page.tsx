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
    .select("*")
    .eq("organizer_id", user?.id)
    .order("starts_at", { ascending: true });

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#155217] mb-1">My Events</h1>
          <p className="text-[#177e19]">Manage your organized events</p>
        </div>
        <Link
          href="/organizer/create"
          className="bg-[#25c226] text-white px-4 py-2 rounded-lg hover:bg-[#19a01a] transition-colors font-medium shadow-sm flex items-center gap-2"
        >
          <span>+</span>
          Create Event
        </Link>
      </div>

      {!events?.length ? (
        <div className="text-center py-12">
          <div className="bg-[#defbdd]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📅</span>
          </div>
          <h3 className="text-lg font-medium text-[#155217] mb-2">No events yet</h3>
          <p className="text-[#177e19] mb-4">Create your first event to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events?.map((ev) => (
            <div key={ev.id} className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#155217] mb-2">{ev.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-[#177e19]">
                    <span className="flex items-center gap-1">
                      {new Date(ev.starts_at).toLocaleString("en-MY")}
                    </span>
                    <p className="text-sm text-gray-600">
                      {ev.venue_name}, {ev.address_line1}, {ev.address_line2}, {ev.city}, {ev.state}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/organizer/edit/${ev.id}`}
                    className="text-[#25c226] hover:text-[#19a01a] font-medium transition-colors px-3 py-1 rounded-lg hover:bg-[#defbdd]/30"
                  >
                    Edit
                  </Link>
                  <DeleteEventButton eventId={ev.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}