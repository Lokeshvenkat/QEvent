"use client"; 

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; 
import { MultiSelect } from "react-multi-select-component"; 

export default function CreateEventForm() {
  const { data: session } = useSession();
  const router = useRouter();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    tags: [],
    artist: "",
    price: "",
    description: "",
  });

  // State to manage available tags and selected tags
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Fetch available event tags from API
  const fetchTags = async () => {
    try {
      const response = await fetch("https://qevent-backend.labs.crio.do/tags");
      const tagList = await response.json();
      setTags(tagList.map((tag) => ({ label: tag.name, value: tag.name }))); // Convert API data to MultiSelect format
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  // Validates that all form fields contain values before submission
  const isFormValid = (data) => {
    return Object.values(data).every((field) => field && field.length);
  };

  // Handles form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Assign selected tags to the form data
    formData.tags = selectedTags.map((tag) => tag.value);

    if (isFormValid(formData)) {
      const randomImageId = Math.floor(Math.random() * 100); // Generate a random image ID

      const payload = {
        ...formData,
        id: uuidv4(),
        image: `https://randomuser.me/api/portraits/men/${randomImageId}.jpg`, // Placeholder image for the event
      };

      try {
        await fetch("https://qevent-backend.labs.crio.do/events", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        router.push("/events"); // Redirect to events page after successful creation
      } catch (error) {
        alert("Event creation failed. Please try again.");
        console.error("Error creating event:", error);
      }
    }
  };

  // Redirects to events page if the user is not logged in
  useEffect(() => {
    if (!session) {
      router.push("/events");
    }
  }, [session]);

  // Fetches available tags when the component mounts
  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <form
        className="h-[350px] w-[550px] flex flex-wrap shadow-md p-8 gap-x-4"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          placeholder="Event Name"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="h-[40px] w-[200px] rounded px-2 border-2 focus:border-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Location"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
          className="h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <input
          type="date"
          placeholder="Date"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          className="h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <input
          type="time"
          placeholder="Time"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, time: e.target.value }))
          }
          className="h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <MultiSelect
          options={tags}
          value={selectedTags}
          onChange={setSelectedTags}
          labelledBy="Select"
          className="w-[200px]"
        />
        <input
          type="text"
          placeholder="Artist"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, artist: e.target.value }))
          }
          className="h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <input
          type="text"
          placeholder="Price"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: e.target.value }))
          }
          className="h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="h-[40px] w-[200px] rounded px-2 border-2"
          required
        />
        <button
          className="h-[40px] w-[130px] bg-red-500 text-white text-sm rounded"
          type="submit"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
