import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  return (
    <section className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#155217] mb-2">Create Event</h1>
        <p className="text-[#177e19]">Share knowledge with your community</p>
      </div>
      
      <div>
        <EventForm />
      </div>
    </section>
  );
}
