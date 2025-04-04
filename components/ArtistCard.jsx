"use client"; 

import { useRouter } from "next/navigation"; 

/**
 * ArtistCard component displays information about an artist.
 * It includes an image, name, location, and a button to view events related to the artist.
 */
const ArtistCard = ({ artistData }) => {
  const router = useRouter(); // Initialize router for navigation

  /**
   * Handles the "View Events" button click.
   * Redirects the user to the events page with the artist's name as a query parameter.
   */
  const handleViewEventsClick = () => {
    router.push(`/events?artist=${encodeURIComponent(artistData.name)}`);
  };

  return (
    <div className="hover-inverse group w-[20%] min-w-[300px] h-fit flex text-center justify-center transform transition-transform duration-400 hover:scale-110 hover:bg-gradient-to-r hover:from-orange-200 hover:to-white text-dark m-4 border-slate-400 border rounded-md px-8 py-2.5">
      <div>
        {/* Artist profile image */}
        <img
          className="w-24 h-24 mb-3 group-hover:filter-none rounded-full shadow-lg m-auto"
          src={artistData.image}
          alt={`${artistData.name} image`}
        />

        {/* Artist location */}
        <p>{artistData.location}</p>

        {/* Artist name */}
        <h2 className="text-2xl font-bold">{artistData.name}</h2>

        {/* Artist description */}
        <p>{artistData.description}</p>

        <div className="flex justify-between items-center mt-10">
          {/* Artist's name (or related text) */}
          <h3 className="text-2xl">{artistData.artist}</h3>
        </div>

        {/* Button to view events related to the artist */}
        <button
          onClick={handleViewEventsClick}
          className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
        >
          View Events
        </button>
      </div>
    </div>
  );
};

export default ArtistCard; // Export the ArtistCard component
