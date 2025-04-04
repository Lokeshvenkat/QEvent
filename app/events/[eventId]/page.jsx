export default async function EventDetailPage({ params }) {
    // Fetch event details from the API using the eventId from params
    const apiResponse = await fetch(
      `https://qevent-backend.labs.crio.do/events/`
    );
    const event = await apiResponse.json();
  
    return (
      <div className="flex flex-row justify-center py-4">
        <div className="flex flex-col h-auto w-[80%] gap-y-20">
          {/* Event Image Section */}
          <div className="flex flex-col w-full">
            <div className="w-full flex flex-row justify-center">
              <img
                className="h-[290px] w-[490px] object-cover"
                src={event.image}
                alt={event.name}
              />
            </div>
            {/* Event Name, Location, and Artist */}
            <div className="font-extrabold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
              <h3 className="text-3xl">{event.name}</h3>
              <p className="text-xl">{event.location}</p> {/* Fixed typo in className */}
              <p className="text-xl">{event.artist}</p>
            </div>
          </div>
  
          {/* Event Tags, Description, and Pricing Section */}
          <div className="flex flex-col w-full gap-y-2">
            {/* Tags Section */}
            <div className="flex flex-row gap-x-4">
              {event.tags.map((tag, index) => (
                <Tag key={index} text={tag} />
              ))}
            </div>
  
            {/* Event Description */}
            <p className="font-serif font-medium">{event.description}</p>
  
            {/* Pricing and Buy Tickets Button */}
            <div className="flex flex-row justify-between w-full items-center">
              <p className="text-3xl font-extrabold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
                {`$${event.price}`}
              </p>
              <button className="h-[30px] w-[100px] text-center bg-red-500 text-white border-none text-sm rounded">
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  