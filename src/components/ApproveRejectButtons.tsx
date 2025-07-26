"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ApproveRejectButtons({ userId }: { userId: string }) {
  const supabase = createClient();
  const router = useRouter();

  const decide = async (approve: boolean) => {
    // 1. Copy application data into profiles
    const { data: app } = await supabase
      .from("organizer_applications")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!app) return;

    await supabase
      .from("profiles")
      .update({
        role: approve ? "organizer" : "user",
        full_legal_name: app.full_legal_name,
        user_position: app.user_position,
        mosque_org: app.mosque_org,
        phone: app.phone,
        mosque_location: app.mosque_location,
      })
      .eq("id", userId);

    // 2. Delete the application row
    // await supabase.from("organizer_applications").delete().eq("user_id", userId);
    await supabase.from("organizer_applications").delete().eq("id", app.id);

    router.refresh();
  };

  return (
    <div className="space-x-2">
      <button
        onClick={() => decide(true)}
        className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700"
      >
        Approve
      </button>
      <button
        onClick={() => decide(false)}
        className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-100"
      >
        Reject
      </button>
    </div>
  );
}