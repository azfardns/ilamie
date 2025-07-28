import Link from "next/link";

interface Event {
  id: string;
  title: string;
  starts_at: string;
  speaker: string;
  venue_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
}

export default function EventCard({ event }: { event: Event }) {
  const date = new Date(event.starts_at).toLocaleString("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Link
      href={`/events/${event.id}`}
      className="block bg-white/90 backdrop-blur-sm rounded-xl border border-[#defbdd] p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#25c226]/30 group focus:outline-none focus:ring-2 focus:ring-[#25c226]"
      tabIndex={0}
    >
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-[#155217] mb-2 group-hover:text-[#25c226] transition-colors line-clamp-2">
            {event.title}
          </h2>
          <p className="text-sm text-[#186319] font-medium mb-1">{event.speaker}</p>
          <p className="text-sm text-gray-600">
            {event.venue_name}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="bg-[#defbdd]/50 px-3 py-1.5 rounded-lg">
            <p className="text-sm font-medium text-[#25c226]">{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}