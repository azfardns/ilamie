"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ApproveRejectButtons({ userId }: { userId: string }) {
  const supabase = createClient();
  const router = useRouter();

  const updateRole = async (role: "organizer" | "user") => {
    await supabase
      .from("profiles")
      .update({
        role,
        applied_for_organizer: false,
      })
      .eq("id", userId);
    router.refresh();
  };

  return (
    <div className="space-x-2">
      <button
        onClick={() => updateRole("organizer")}
        className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700"
      >
        Approve
      </button>
      <button
        onClick={() => updateRole("user")}
        className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-100"
      >
        Reject
      </button>
    </div>
  );
}