"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function OrganizerApplicationForm() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const phone = String(fd.get("phone") || "");
    if (!/^\d+$/.test(phone)) {
      setLoading(false);
      alert("Phone number must contain digits only.");
      return;
    }

    const payload = {
      full_legal_name: String(fd.get("full_legal_name") || "").toUpperCase(),
      user_position: String(fd.get("user_position") || "").toUpperCase(),
      mosque_org: String(fd.get("mosque_org") || "").toUpperCase(),
      phone: phone.toUpperCase(),
      mosque_location: String(fd.get("mosque_location") || "").toUpperCase(),
      reason: reason, // keep as is, or use reason.toUpperCase() if you want
      user_id: (await supabase.auth.getUser()).data.user!.id,
    };

    const { error } = await supabase.from("organizer_applications").insert(payload);
    setLoading(false);

    if (!error) {
      router.push("/account?submitted=true");
    } else {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        name="full_legal_name"
        placeholder="Full Legal Name"
        required
        className="w-full border p-2 rounded uppercase"
      />
      <input
        name="user_position"
        placeholder="Position / Role"
        required
        className="w-full border p-2 rounded uppercase"
      />
      <input
        name="mosque_org"
        placeholder="Mosque / Organization"
        required
        className="w-full border p-2 rounded uppercase"
      />
      <input
        name="phone"
        type="tel"
        pattern="[0-9]+"
        inputMode="numeric"
        placeholder="Phone Number"
        required
        className="w-full border p-2 rounded uppercase"
      />
      <input
        name="mosque_location"
        placeholder="Mosque / Organization Location"
        required
        className="w-full border p-2 rounded uppercase"
      />
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value.slice(0, 500))}
        maxLength={500}
        name="reason"
        placeholder="Reason to organize events (max 500 chars)"
        rows={4}
        required
        className="w-full border p-2 rounded"
      />
      <p className="text-xs text-gray-500">{500 - reason.length} chars left</p>

      <button
        disabled={loading}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}