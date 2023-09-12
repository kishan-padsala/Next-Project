import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import EventList from "@/components/events/event-list";
import { DUMMY_EVENTS_TYPE } from "@/types";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import LinearBuffer from "@/components/ui/linearProgress";

const HomePage = () => {
  const [featuredEvents, setFeaturedEvents] = useState<DUMMY_EVENTS_TYPE[]>([]);
  const [eventsIsLoading, setEventsIsLoading] = useState(false);

  useEffect(() => {
    setEventsIsLoading(true);
    fetch("/api/getFeaturedEvents")
      .then((response) => response.json())
      .then((data) => {
        setFeaturedEvents(data.events);
        setEventsIsLoading(false);
      });
  }, []);

  // let featuredEvents: DUMMY_EVENTS_TYPE[] = [];
  // featuredEvents = allEvents.filter((event) => event.isFeatured === true);
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />        
      </Head>
      {eventsIsLoading && <LinearBuffer />}
      <NewsletterRegistration />
      {eventsIsLoading && <p className="loading">Events Loading...</p>}
      {!eventsIsLoading && <EventList items={featuredEvents} />}
    </Fragment>
  );
};

// export async function getStaticProps() {
//   // const response = await fetch("/api/getFeaturedEvents");
//   // const data = await response.json();

//   // const featuredEvents = data.events;

//   const response = await fetch("http://localhost:3000/api/getFeaturedEvents");
//   const data = await response.json();

//   const featuredEvents = data.events;
//   return {
//     props: {
//       featuredEvents: featuredEvents,
//     },
//     revalidate: 1800,
//   };
// }

export default HomePage;
