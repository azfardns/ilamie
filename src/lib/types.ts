export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
}

export interface Event {
  id?: string;            // optional for create
  title: string;
  description: string;
  speaker: string;
  starts_at: string;
  venue_id: string;
}