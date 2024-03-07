import React, { useEffect, useMemo, useState } from "react";
import FeaturedEventCard from "../Components/FeaturedEventCard";
import eventImage from "../Assets/Common_images/sampleEvent.png";
import axios from "axios";

const EventCard = ({ day, event }) => {
  const token = localStorage.getItem("token");
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get(`/api/e/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setAllEvents(data.events);
    };

    getEvents();
  }, [token]);

  // Filter events based on selected day and event
  const filteredEvents = useMemo(() => {
    let filtered = allEvents;

    if (day === "Day One") {
      filtered = filtered.filter((event) => event.day === 1);
    } else if (day === "Day Two") {
      filtered = filtered.filter((event) => event.day === 2);
    } else if (day === "Day Three") {
      filtered = filtered.filter((event) => event.day === 3);
    }

    if (event === "Cultural") {
      filtered = filtered.filter((event) => event.category === "C");
    } else if (event === "Technical") {
      filtered = filtered.filter((event) => event.category === "T");
    } else if (event === "Seminar") {
      filtered = filtered.filter((event) => event.category === "S");
    }

    return filtered;
  }, [day, event, allEvents]);

  return (
    <div className="flex flex-wrap justify-center gap-10 px-10 w-[100vw]">
      {filteredEvents.map((event, index) => {
        return (
          <FeaturedEventCard
            key={event.event_code}
            eventId={event.event_code}
            eventName={event.title}
            category={event.category}
            date={event.day}
            max_seats={event.max_seats}
            seats={event.seats}
            eventImage={eventImage}
            teamSize={event.team_size}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default EventCard;
