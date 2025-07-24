import { createServerClient } from "@/lib/supabase/server";
import EventCard from "@/components/EventCard";
import FilterBar from "@/components/FilterBar";

interface Props {
  searchParams?: {
    venue?: string;
    speaker?: string;
    from?: string;
    to?: string;
  };
}

export default async function Home({ searchParams = {} }: Props) {
  const supabase = createServerClient();

  // Build query
  let query = supabase
    .from("events")
    .select("*, venue:venues(name, city, state)")
    .order("starts_at", { ascending: true });

  if (searchParams.venue)
    query = query.eq("venue_id", searchParams.venue);
  if (searchParams.speaker)
    query = query.ilike("speaker", `%${searchParams.speaker}%`);
  if (searchParams.from)
    query = query.gte("starts_at", searchParams.from);
  if (searchParams.to)
    query = query.lte("starts_at", searchParams.to);

  const { data: events, error } = await query;

  // Venue dropdown list
  const { data: venues } = await supabase
    .from("venues")
    .select("id, name")
    .order("name");

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Upcoming Lectures</h1>

      <FilterBar venues={venues || []} />

      {error && <p className="text-red-600">{error.message}</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}