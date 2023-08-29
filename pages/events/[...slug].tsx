import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { DUMMY_EVENTS_TYPE } from "@/types";
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
  const [loadedEvents, setLoadedEvents] = useState<DUMMY_EVENTS_TYPE[]>();

  const router = useRouter();
  const filterData = router.query.slug;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://react-http-10be4-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events: DUMMY_EVENTS_TYPE[] = [];
      for (const key in data) {
        events.push(data[key]);
      }
      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Featured Events</title>
      <meta name="description" content={"Display all featured events."} />
    </Head>
  );

  if (!filterData || !loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
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
    numMonth > 12 ||
    error
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

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

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
