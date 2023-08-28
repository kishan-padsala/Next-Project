import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "@/helper/api-util";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { GetServerSideProps } from "next";
import { DUMMY_EVENTS_TYPE } from "@/types";

type Props = {
  hasError: boolean;
  events: DUMMY_EVENTS_TYPE[];
  date: {
    numYear: number;
    numMonth: number;
  };
};

const FilteredEventsPage = (props: Props) => {
  const { hasError } = props;

  // const router = useRouter();
  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your filter's values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const { events } = props;
  const filteredEvents = events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filters!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const { numYear, numMonth } = props.date;
  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const filterData = params!.slug;

  if (filterData) {
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2023 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12
    ) {
      return {
        props: { hasError: true },
        //notFound: true,
        // redirect: {
        //   destination: '/error'
        // }
      };
    }
    const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });
    return {
      props: {
        events: filteredEvents,
        date: {
          numYear,
          numMonth,
        },
      },
    };
  } else {
    return {
      notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }
};

export default FilteredEventsPage;
