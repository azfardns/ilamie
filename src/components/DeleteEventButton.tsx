"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DeleteEventButton({ eventId }: { eventId: string }) {
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", eventId);
    router.refresh();
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline">
      Delete
    </button>
  );
}