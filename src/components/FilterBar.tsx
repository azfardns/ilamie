"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterBar({ venues }: { venues: { id: string; name: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [venue, setVenue] = useState(searchParams.get("venue") || "");
  const [speaker, setSpeaker] = useState(searchParams.get("speaker") || "");
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (venue) params.set("venue", venue);
    if (speaker) params.set("speaker", speaker);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded shadow">
      <select value={venue} onChange={(e) => setVenue(e.target.value)} className="border px-3 py-1 rounded">
        <option value="">All Venues</option>
        {venues.map((v) => (
          <option key={v.id} value={v.id}>{v.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Speaker"
        value={speaker}
        onChange={(e) => setSpeaker(e.target.value)}
        className="border px-3 py-1 rounded"
      />

      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border px-3 py-1 rounded" />
      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border px-3 py-1 rounded" />

      <button onClick={applyFilters} className="bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-700">
        Filter
      </button>
    </div>
  );
}