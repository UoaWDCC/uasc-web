import { useState, useEffect } from "react";
import Event from "../components/Event";

const Events = () => {
  // dummy state
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "title1",
      desc: "desc1",
      date: "01/01/23",
      img: "https://se-images.campuslabs.com/clink/images/b6e07e9e-cc77-480c-acd5-e3904f35f257db00e0dc-2eff-4270-a281-41707e4c4e0e.png?preset=med-sq",
    },
    {
      id: 2,
      title: "title2",
      desc: "desc2",
      date: "02/01/23",
      img: "https://se-images.campuslabs.com/clink/images/b6e07e9e-cc77-480c-acd5-e3904f35f257db00e0dc-2eff-4270-a281-41707e4c4e0e.png?preset=med-sq",
    },
    {
      id: 3,
      title: "title3",
      desc: "desc3",
      date: "03/01/23",
      img: "https://se-images.campuslabs.com/clink/images/b6e07e9e-cc77-480c-acd5-e3904f35f257db00e0dc-2eff-4270-a281-41707e4c4e0e.png?preset=med-sq",
    },
  ]);

  const fetchEvents = (uri) => {
    console.log("Fetched events");
  };

  useEffect(() => {
    fetchEvents(`some API endpoint`);
  }, []);

  return (
    <div>
      <h1> Events page</h1>
      <ul>
        {events.map((e) => {
          return (
            <li key={e.id} style={{ listStyleType: "none" }}>
              <Event {...e} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Events;
