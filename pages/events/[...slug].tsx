import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { DUMMY_EVENTS_TYPE } from "@/types";
import LinearBuffer from "@/components/ui/linearProgress";
// import { GetServerSideProps } from "next";

// type Props = {
//   hasError: boolean;
//   events: DUMMY_EVENTS_TYPE[];
//   date: {
//     numYear: number;
//     numMonth: number;
//   };
// };

const FilteredEventsPage = () => {
  const [allEvents, setAllEvents] = useState<DUMMY_EVENTS_TYPE[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const filterData = router.query.slug;

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/add-get-events")
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        const data = await response.json();
        throw new Error(data.message || "Something went wrong!");
      })
      .then((data) => {
        setAllEvents(data.events);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  let pageHeadData = (
    <Head>
      <title>Featured Events</title>
      <meta name="description" content={"Display all featured events."} />
    </Head>
  );

  if (!filterData || isLoading) {
    return (
      <Fragment>
        {pageHeadData}
        {isLoading && <LinearBuffer />}
        <p className="loading" style={{ marginTop: "28px" }}>
          Events Loading...
        </p>
      </Fragment>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Featured Events</title>
      <meta
        name="description"
        content={`All events for ${numYear}/${numMonth}.`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2023 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your filter's values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (error) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Fetching Events Failed Please Try Again After Some Time!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  let filteredEvents;
  if (allEvents) {
    filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === numYear &&
        eventDate.getMonth() === numMonth - 1
      );
    });
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filters!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params } = context;

//   const filterData = params!.slug;

//   if (filterData) {
//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (
//       isNaN(numYear) ||
//       isNaN(numMonth) ||
//       numYear > 2023 ||
//       numYear < 2021 ||
//       numMonth < 1 ||
//       numMonth > 12
//     ) {
//       return {
//         props: { hasError: true },
//         //notFound: true,
//         // redirect: {
//         //   destination: '/error'
//         // }
//       };
//     }
//     const filteredEvents = await getFilteredEvents({
//       year: numYear,
//       month: numMonth,
//     });
//     return {
//       props: {
//         events: filteredEvents,
//         date: {
//           numYear,
//           numMonth,
//         },
//       },
//     };
//   } else {
//     return {
//       notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }
// };

export default FilteredEventsPage;
