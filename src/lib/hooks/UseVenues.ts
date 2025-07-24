"use client";
import { useEffect, useState } from "react";
import { Venue } from "@/lib/types";

export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    fetch("/api/venues")
      .then((r) => r.json())
      .then(setVenues)
      .catch(console.error);
  }, []);

  return venues;
}