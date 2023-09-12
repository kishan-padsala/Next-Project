import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import { DUMMY_EVENTS_TYPE } from "@/types";
import Comments from "@/components/input/comments";
import LinearBuffer from "@/components/ui/linearProgress";

const EventDetailPage = () => {
  const [event, setEvent] = useState<DUMMY_EVENTS_TYPE | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const eventId = router.query.eventId;
  console.log(eventId);
  useEffect(() => {
    setIsLoading(true);
    if(eventId){
      fetch(`http://localhost:3000/api/events/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setEvent(data.eventDetailPage);
          setIsLoading(false);
        });
    }
  }, []);

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.title} />
      </Head>
      {isLoading && <LinearBuffer />}
      {isLoading && <p className="loading">Event Details Loading...</p>}
      {!isLoading && (
        <>
          <EventSummary title={event!.title} />
          <EventLogistics
            date={event!.date}
            address={event!.location}
            image={event!.image}
            imageAlt={event!.title}
          />
          <EventContent>
            <p>{event!.description}</p>
          </EventContent>
          <Comments eventId={event.id} />
        </>
      )}
    </Fragment>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const eventId = context.params!.eventId;

//   let event: DUMMY_EVENTS_TYPE | null | undefined;
//   if (eventId) {
//     if (!Array.isArray(eventId)) {
//       const response = await fetch(
//         `http://localhost:3000/api/events/${eventId}`
//       );
//       const data = await response.json();
//       const eventDetailPage = data.eventDetailPage;
//       event = eventDetailPage;
//       if (event === undefined) {
//         event = null;
//       }
//     }
//   }

//   return {
//     props: { event: event },
//     revalidate: 30,
//   };
// };

// export async function getStaticPaths() {
//   const response = await fetch("http://localhost:3000/api/getFeaturedEvents");
//   const data = await response.json();

//   const featuredEvents: DUMMY_EVENTS_TYPE[] = data.events;

//   const paths = featuredEvents.map((event) => ({
//     params: { eventId: event.id },
//   }));

//   return {
//     paths: paths,
//     fallback: "blocking",
//   };
// }

export default EventDetailPage;
