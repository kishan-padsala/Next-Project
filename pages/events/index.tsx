import React, { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "@/components/events/event-list";
import { getAllEvents } from "@/dummy-data";
import EventsSearch from "@/components/events/events-search";

const AllEvenetsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const filterDataHandler = (selectedYear: string, selectedMonth: string) => {
    const setUrl = `/events/${selectedYear}/${selectedMonth}`;

    router.push(setUrl);
  };

  return (
    <Fragment>
      <EventsSearch filterDataHandler={filterDataHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEvenetsPage;
