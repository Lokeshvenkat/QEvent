"use client"; 

import Tag from "./Tag"; 
import Link from "next/link"; 

/**
 * EventCard component displays details about an event.
 * It includes an image, tags, date, time, location, name, artist, and price.
 * Clicking the card navigates to the event's detail page.
 */
const EventCard = ({ eventData }) => {
  return (
    <div className="hover-inverse h-fit group transform transition-transform duration-400 hover:scale-110 hover:bg-gradient-to-r hover:from-orange-200 hover:to-white text-dark m-4 border-slate-400 border rounded-md px-8 py-2.5">
      {/* Link to navigate to the event details page */}
      <Link
        href={`/events/${eventData.id}`}
        className="rounded-md text-dark flex-shrink-0 scroll-snap-card p-4"
      >
        <div>
          {/* Event Image */}
          <img
            className="w-full mb-3 group-hover:filter-none shadow-lg m-auto"
            src={eventData.image}
            alt={eventData.name} // Uses event name as alt text for accessibility
          />

          {/* Display event tags if available */}
          <div className="flex gap-2 items-center">
            {eventData?.tags &&
              eventData?.tags?.map((tag) => <Tag text={tag} key={tag} />)}
          </div>

          {/* Event Date and Time */}
          <p className="mt-5 mb-10">
            {new Date(eventData.date).toDateString()} | {eventData.time}
          </p>

          {/* Event Location */}
          <p>{eventData.location}</p>

          {/* Event Name */}
          <h2 className="text-2xl font-bold">{eventData.name}</h2>

          {/* Event Artist and Price */}
          <div className="flex justify-between items-center mt-10">
            {/* Artist Name */}
            <h3 className="text-2xl">{eventData.artist}</h3>

            {/* Event Price (formatted or marked as FREE) */}
            <h3 className="text-2xl">
              {eventData.price > 0
                ? `$ ${eventData.price.toLocaleString()}`
                : "FREE"}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard; 
