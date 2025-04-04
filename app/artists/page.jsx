"use client"; // Ensures this component runs on the client-side

import { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard"; // Importing the ArtistCard component

function ArtistsPage() {
  const [artists, setArtists] = useState([]); // State to hold artist data

  // Function to fetch artist data from the backend API
  async function loadArtists() {
    try {
      const response = await fetch("https://qevent-backend.labs.crio.do/artists");
      const data = await response.json();
      console.log("Fetched Artists:", data); // Debugging log
      setArtists(data);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  }

  // useEffect runs once when the component mounts to fetch artist data
  useEffect(() => {
    loadArtists();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "32px" }}>
      {artists.length > 0 ? (
        artists.map((artist) => (
          <div key={artist.id} style={{ flex: "1 1 350px" }}>
            <ArtistCard artistData={artist} />
          </div>
        ))
      ) : (
        <p>Loading artists...</p> // Display message while data is being fetched
      )}
    </div>
  );
}

export default ArtistsPage;
