import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { DUMMY_EVENTS_TYPE } from "@/types";
import LinearBuffer from "@/components/ui/linearProgress";

const AllEvenetsPage = () => {
  const [allEvents, setAllEvents] = useState<DUMMY_EVENTS_TYPE[]>([]);
  const [eventsIsLoading, setEventsIsLoading] = useState(false);

  useEffect(() => {
    setEventsIsLoading(true);
    fetch("/api/add-get-events")
      .then((response) => response.json())
      .then((data) => {
        setAllEvents(data.events);
        setEventsIsLoading(false);
      });
  }, []);

  const router = useRouter();

  const findEventHandler = (selectedYear: string, selectedMonth: string) => {
    const fullPath = `/events/${selectedYear}/${selectedMonth}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      {eventsIsLoading && <LinearBuffer/>}
      <EventsSearch onSearch={findEventHandler} />
      {eventsIsLoading && <p className="loading">Events Loading...</p>}
      {!eventsIsLoading && <EventList items={allEvents} />}
    </Fragment>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await fetch("http://localhost:3000/api/add-get-events");
//   const data = await response.json();

//   const events = data.events;

//   return {
//     props: {
//       events: events,
//     },
//   };
// };

export default AllEvenetsPage;
