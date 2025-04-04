import Tag from "@/components/Tag";

/**
 * Fetches and displays a list of tags retrieved from the API.
 */
export default async function TagsPage() {
  // Fetch tags from the backend API
  const apiResponse = await fetch("https://qevent-backend.labs.crio.do/tags");
  const tags = await apiResponse.json();

  return (
    <div className="flex flex-row justify-center items-center h-[50vh] px-4">
      {/* Container for displaying tags in a responsive, wrapped layout */}
      <div className="flex flex-row justify-center items-center flex-wrap gap-x-2 gap-y-2 h-[30px] w-[900px]">
        {/* Render each tag as a component */}
        {tags.map((tag) => (
          <div key={tag.id}>
            <Tag text={tag.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
