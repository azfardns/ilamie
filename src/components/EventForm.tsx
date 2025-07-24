"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Event {
  id?: string;
  title: string;
  description: string;
  speaker: string;
  starts_at: string;
  venue_id: string;
}

export default function EventForm({ initial }: { initial?: Event }) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isEdit = !!initial;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      speaker: fd.get("speaker") as string,
      starts_at: fd.get("starts_at") as string,
      venue_id: fd.get("venue_id") as string,
    };

    if (isEdit) {
      await supabase.from("events").update(payload).eq("id", initial!.id);
    } else {
      await supabase.from("events").insert({
        ...payload,
        organizer_id: (await supabase.auth.getUser()).data.user!.id,
      });
    }
    setLoading(false);
    router.push("/organizer/my-events");
  };

  /* Fetch venues */
  const [venues, setVenues] = useState<{ id: string; name: string }[]>([]);
  useState(() => {
    fetch("/api/venues")
      .then((r) => r.json())
      .then(setVenues)
      .catch(() => {});
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        name="title"
        defaultValue={initial?.title}
        placeholder="Title"
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        defaultValue={initial?.description}
        placeholder="Description"
        rows={4}
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="speaker"
        defaultValue={initial?.speaker}
        placeholder="Speaker"
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="starts_at"
        type="datetime-local"
        defaultValue={initial?.starts_at?.slice(0, 16)}
        required
        className="w-full border p-2 rounded"
      />
      <select
        name="venue_id"
        defaultValue={initial?.venue_id}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">Select Venue</option>
        {venues.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      <button
        disabled={loading}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? "Saving…" : isEdit ? "Save Changes" : "Publish Event"}
      </button>

      {isEdit && (
        <button
          type="button"
          onClick={async () => {
            if (!confirm("Delete this event?")) return;
            await supabase.from("events").delete().eq("id", initial!.id);
            router.push("/organizer/my-events");
          }}
          className="ml-2 border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50"
        >
          Delete
        </button>
      )}
    </form>
  );
}