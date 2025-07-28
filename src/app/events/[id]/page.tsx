import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();

  const { data: event } = await supabase
    .from("events")
    .select("*, organizer:profiles!organizer_id(mosque_org)")
    .eq("id", params.id)
    .single();

  if (!event) notFound();

  const date = new Date(event.starts_at).toLocaleString("en-MY", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <>
      <Header/>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero section ------------------------------------------------ */}
        <header className="mb-8">
          <h1 className="text-5xl font-extrabold text-emerald-800 mb-3">
            {event.title}
          </h1>
          <p className="text-2xl text-emerald-600 font-semibold">
            Speaker – <span className="text-emerald-500">{event.speaker}</span>
          </p>
          <p className="text-lg text-slate-600 mt-2">
            Organized by <span className="font-bold text-emerald-700">{event.organizer?.mosque_org ?? "—"}</span>
          </p>
        </header>

        {/* Details grid ------------------------------------------------ */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Date & Time */}
          <article className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">Date & Time</h3>
            <p className="text-emerald-600 text-lg">{date}</p>
          </article>

          {/* Venue */}
          <article className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">Venue</h3>
            <p className="text-emerald-600 font-medium">{event.venue_name}</p>
            <p className="text-slate-500 text-sm mt-1">
              {event.address_line1}, {event.address_line2}, {event.city}, {event.state}
            </p>
          </article>
        </section>

        {/* Description ------------------------------------------------- */}
        {event.description && (
          <article className="bg-white p-6 rounded-xl shadow mt-8">
            <h3 className="text-xl font-semibold text-emerald-700 mb-3">Description</h3>
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {event.description}
            </p>
          </article>
        )}
      </main>
    </>
  );
}