import React, { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import { getEventById } from "@/helper/api-util";
import ErrorAlert from "@/components/ui/error-alert";
import { GetStaticPaths, GetStaticProps } from "next";
import { DUMMY_EVENTS_TYPE } from "@/types";
import { getFeaturedEvents } from "@/helper/api-util";

const EventDetailPage = ({ event }: { event: DUMMY_EVENTS_TYPE | null }) => {
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
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params!.eventId;

  let event: DUMMY_EVENTS_TYPE | null | undefined;
  if (eventId) {
    if (!Array.isArray(eventId)) {
      event = await getEventById(eventId);
      if (event === undefined) {
        event = null;
      }
    }
  }

  return {
    props: { event: event },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
