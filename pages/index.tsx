import { getFeaturedEvents } from "@/helper/api-util";
import React, { Fragment } from "react";
import Head from "next/head";
import EventList from "@/components/events/event-list";
import { DUMMY_EVENTS_TYPE } from "@/types";
import NewsletterRegistration from "@/components/input/newsletter-registration";

const HomePage = ({
  featuredEvents,
}: {
  featuredEvents: DUMMY_EVENTS_TYPE[];
}) => {
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </Fragment>
  );
};

export async function getStaticProps() {
  // const response = await fetch("/api/getFeaturedEvents");
  // const data = await response.json();

  // const featuredEvents = data.events;

  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
