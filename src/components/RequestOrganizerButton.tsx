"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RequestOrganizerButton({ userId }: { userId: string }) {
  const supabase = createClient();
  const router = useRouter();

  const request = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ applied_for_organizer: true })
      .eq("id", userId);

    if (!error) {
      // Force server components to re-render with fresh data
      router.refresh();
    }
  };

  return (
    <button
      onClick={request}
      className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
    >
      Request Organizer Status
    </button>
  );
}