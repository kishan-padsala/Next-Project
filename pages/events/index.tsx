import React, { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "@/components/events/event-list";
import { getAllEvents } from "@/helper/api-util";
import EventsSearch from "@/components/events/events-search";
import { GetStaticProps } from "next";
import { DUMMY_EVENTS_TYPE } from "@/types";

const AllEvenetsPage = ({ events }: { events: DUMMY_EVENTS_TYPE[] }) => {
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
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
  };
};

export default AllEvenetsPage;
