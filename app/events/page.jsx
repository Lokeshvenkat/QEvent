"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";

/**
 * Fetches event data from the API.
 * @returns {Promise<Array>} - A promise that resolves to an array of event objects.
 */
async function fetchEvents() {
  const response = await fetch("https://qevent-backend.labs.crio.do/events");
  return response.json();
}

/**
 * Renders a list of events and filters them based on URL search parameters.
 * Filters include 'artist' and 'tag' parameters.
 */
function EventsComponent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState([]); // Stores all events
  const [filteredEvents, setFilteredEvents] = useState([]); // Stores filtered events

  // Retrieve filtering parameters from the URL
  const artistFilter = searchParams.get("artist");
  const tagFilter = searchParams.get("tag");

  useEffect(() => {
    /**
     * Fetches events from the API and filters them based on URL parameters.
     */
    async function fetchData() {
      const allEvents = await fetchEvents(); // Fetch event data

      let filtered = allEvents;

      // Filter events by artist if the filter is provided
      if (artistFilter) {
        filtered = filtered.filter((event) => event.artist === artistFilter);
      }

      // Filter events by tag if the filter is provided
      if (tagFilter) {
        filtered = filtered.filter((event) => event?.tags?.includes(tagFilter));
      }

      setFilteredEvents(filtered); // Update state with filtered events
    }

    fetchData();
  }, [artistFilter, tagFilter]); // Runs when filter parameters change

  return (
    <div className="flex flex-row gap-x-2 gap-y-2 px-3 py-3 flex-wrap justify-evenly">
      {/* Check if filtered events exist before rendering */}
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div key={event.id}>
            <EventCard eventData={event} />
          </div>
        ))
      ) : (
        <p>No events found...</p>
      )}
    </div>
  );
}

/**
 * Main component that wraps the event list with Suspense for better loading state handling.
 */
export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <EventsComponent />
    </Suspense>
  );
}
