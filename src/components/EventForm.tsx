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
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <input
              name="title"
              defaultValue={initial?.title}
              placeholder="Event title"
              required
              className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg 
                       text-gray-900 placeholder-gray-500 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#25c226] focus:border-transparent
                       transition-all duration-200 hover:border-gray-300"
            />
          </div>
          
          <input
            name="speaker"
            defaultValue={initial?.speaker}
            placeholder="Speaker name"
            required
            className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg 
                     text-gray-900 placeholder-gray-500 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#25c226] focus:border-transparent
                     transition-all duration-200 hover:border-gray-300"
          />
          
          <input
            name="starts_at"
            type="datetime-local"
            defaultValue={initial?.starts_at?.slice(0, 16)}
            required
            className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg 
                     text-gray-900 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#25c226] focus:border-transparent
                     transition-all duration-200 hover:border-gray-300"
          />
          
          <div className="md:col-span-2">
            <select
              name="venue_id"
              defaultValue={initial?.venue_id}
              required
              className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg 
                       text-gray-900 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#25c226] focus:border-transparent
                       transition-all duration-200 hover:border-gray-300"
            >
              <option value="" className="text-gray-500">Select venue</option>
              {venues.map((v) => (
                <option key={v.id} value={v.id} className="text-gray-900">
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <textarea
              name="description"
              defaultValue={initial?.description}
              placeholder="Event description"
              rows={4}
              required
              className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg 
                       text-gray-900 placeholder-gray-500 text-sm resize-none
                       focus:outline-none focus:ring-2 focus:ring-[#25c226] focus:border-transparent
                       transition-all duration-200 hover:border-gray-300"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            disabled={loading}
            className="bg-[#25c226] text-white px-6 py-3 rounded-lg text-sm font-medium
                     hover:bg-[#19a01a] active:bg-[#177e19] disabled:bg-gray-300
                     transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                     focus:outline-none focus:ring-2 focus:ring-[#25c226] focus:ring-offset-2
                     shadow-sm hover:shadow-md disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Publish Event"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={async () => {
                if (!confirm("Delete this event?")) return;
                await supabase.from("events").delete().eq("id", initial!.id);
                router.push("/organizer/my-events");
              }}
              className="border border-red-300 text-red-600 px-6 py-3 rounded-lg text-sm font-medium
                       hover:bg-red-50 hover:border-red-400 active:bg-red-100
                       transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}