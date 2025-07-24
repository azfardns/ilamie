import { createServerClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import EventForm from "@/components/EventForm";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) redirect("/login");

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .eq("organizer_id", user.user.id) // owners only
    .single();

  if (!event) notFound();

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <EventForm initial={event} />
    </section>
  );
}