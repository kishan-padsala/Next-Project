import { getFeaturedEvents } from "@/helper/api-util";
import React from "react";
import EventList from "@/components/events/event-list";
import { DUMMY_EVENTS_TYPE } from "@/types";

const HomePage = ({
  featuredEvents,
}: {
  featuredEvents: DUMMY_EVENTS_TYPE[];
}) => {
  return <EventList items={featuredEvents} />;
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
