import Link from "next/link";

interface Event {
  id: string;
  title: string;
  starts_at: string;
  speaker: string;
  venue: {
    name: string;
    city: string;
  };
}

export default function EventCard({ event }: { event: Event }) {
  const date = new Date(event.starts_at).toLocaleString("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#defbdd] p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#25c226]/30 group">
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-[#155217] mb-2 group-hover:text-[#25c226] transition-colors line-clamp-2">
            {event.title}
          </h2>
          <p className="text-sm text-[#186319] font-medium mb-1">{event.speaker}</p>
          <p className="text-sm text-[#177e19]/80 mb-3">
            {event.venue.name}, {event.venue.city}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="bg-[#defbdd]/50 px-3 py-1.5 rounded-lg">
            <p className="text-sm font-medium text-[#25c226]">{date}</p>
          </div>
          
          <Link
            href={`/events/${event.id}`}
            className="text-[#25c226] hover:text-[#19a01a] text-sm font-medium transition-colors flex items-center gap-1 group-hover:gap-2"
          >
            View Details
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}