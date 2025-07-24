"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const { error } = await supabase.from("events").insert({
      title: form.get("title"),
      description: form.get("description"),
      starts_at: form.get("starts_at"),
      venue_id: form.get("venue_id"),
      speaker: form.get("speaker"),
    });

    setLoading(false);
    if (!error) router.push("/organizer/my-events");
    else alert(error.message);
  };

  return (
    <section>
        <h1 className="text-2xl font-bold mb-4">Create Event</h1>
        <EventForm />
    </section>
  );
}

// Tiny helper to fetch venues
function VenueSelect() {
  const { data: venues } = useQuery(["venues"], () =>
    fetch("/api/venues").then((r) => r.json())
  );
  return (
    <select name="venue_id" required className="w-full border p-2 rounded">
      <option value="">Select Venue</option>
      {venues?.map((v: any) => (
        <option key={v.id} value={v.id}>{v.name}</option>
      ))}
    </select>
  );
}