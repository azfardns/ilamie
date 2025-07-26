import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();

  const { data: event } = await supabase
    .from("events")
    .select("*, venue:venues(name, address, city, state)")
    .eq("id", params.id)
    .single();

  if (!event) notFound();

  const date = new Date(event.starts_at).toLocaleString("en-MY", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <section className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#25c226] hover:text-[#19a01a] font-medium transition-colors mb-4"
        >
          <span className="transition-transform hover:-translate-x-0.5">←</span>
          Back to events
        </Link>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#defbdd] shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#defbdd]/30 to-[#bdf6bc]/30 px-6 py-8">
          <h1 className="text-3xl font-bold text-[#155217] mb-3">{event.title}</h1>
          <p className="text-xl text-[#25c226] font-semibold">{event.speaker}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#155217] mb-2 flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  Venue
                </h3>
                <div className="bg-[#f1fdf0] p-4 rounded-lg border border-[#defbdd]">
                  <p className="font-medium text-[#177e19]">{event.venue.name}</p>
                  <p className="text-[#186319] text-sm mt-1">
                    {event.venue.address}, {event.venue.city}, {event.venue.state}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#155217] mb-2 flex items-center gap-2">
                  <span className="text-lg">🗓️</span>
                  Date & Time
                </h3>
                <div className="bg-[#f1fdf0] p-4 rounded-lg border border-[#defbdd]">
                  <p className="font-medium text-[#177e19]">{date}</p>
                </div>
              </div>
            </div>
          </div>

          {event.description && (
            <div>
              <h3 className="font-semibold text-[#155217] mb-3 flex items-center gap-2">
                <span className="text-lg">📋</span>
                Description
              </h3>
              <div className="bg-[#f1fdf0] p-4 rounded-lg border border-[#defbdd]">
                <p className="text-[#177e19] whitespace-pre-wrap leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}