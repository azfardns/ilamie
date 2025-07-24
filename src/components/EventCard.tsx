import Link from "next/link";

export default function EventCard({ event }: { event: any }) {
  const date = new Date(event.starts_at).toLocaleString("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-1">{event.title}</h2>
        <p className="text-sm text-gray-600 mb-1">{event.speaker}</p>
        <p className="text-sm text-gray-500 mb-2">{event.venue.name}, {event.venue.city}</p>
        <p className="text-sm font-medium text-emerald-700">{date}</p>
      </div>
      <Link
        href={`/events/${event.id}`}
        className="mt-4 text-emerald-600 text-sm hover:underline"
      >
        View Details &rarr;
      </Link>
    </div>
  );
}