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
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#defbdd] shadow-sm">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#186319] mb-1">Venue</label>
          <select 
            value={venue} 
            onChange={(e) => setVenue(e.target.value)} 
            className="border border-[#bdf6bc] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#25c226] focus:border-transparent outline-none bg-white text-sm min-w-[120px]"
          >
            <option value="">All Venues</option>
            {venues.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#186319] mb-1">Speaker</label>
          <input
            type="text"
            placeholder="Search speaker..."
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            className="border border-[#bdf6bc] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#25c226] focus:border-transparent outline-none text-sm min-w-[140px]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#186319] mb-1">From</label>
          <input 
            type="date" 
            value={from} 
            onChange={(e) => setFrom(e.target.value)} 
            className="border border-[#bdf6bc] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#25c226] focus:border-transparent outline-none text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#186319] mb-1">To</label>
          <input 
            type="date" 
            value={to} 
            onChange={(e) => setTo(e.target.value)} 
            className="border border-[#bdf6bc] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#25c226] focus:border-transparent outline-none text-sm"
          />
        </div>

        <button 
          onClick={applyFilters} 
          className="bg-[#25c226] text-white px-5 py-2 rounded-lg hover:bg-[#19a01a] transition-colors font-medium shadow-sm h-fit"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}