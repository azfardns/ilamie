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
    <section className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-lg text-emerald-700 mb-4">{event.speaker}</p>

      <div className="mb-4">
        <p className="font-semibold">{event.venue.name}</p>
        <p className="text-gray-600">{event.venue.address}, {event.venue.city}, {event.venue.state}</p>
        <p className="text-gray-800 mt-1">{date}</p>
      </div>

      <p className="whitespace-pre-wrap">{event.description}</p>

      {/* back link */}
      <Link href="/" className="inline-block mt-8 text-emerald-600 hover:underline">
        &larr; Back to events
      </Link>
    </section>
  );
}