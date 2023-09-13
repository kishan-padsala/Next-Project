import React from "react";
import Button from "../ui/button";
import Image from "next/image";
import { DUMMY_EVENTS_TYPE } from "@/types";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import classes from "./event-item.module.css";
import DeleteIcon from "../icons/delete-icon";

const EventItem = ({ event }: { event: DUMMY_EVENTS_TYPE }) => {
  const { id, title, image, date, location } = event;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  function deleteEventHandler() {
    fetch("/api/deleteEvent", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={450} height={360} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <button className={classes.deletebtn} onClick={deleteEventHandler}>
            <span>Delete</span>
            <span className={classes.icon}>
              <DeleteIcon />
            </span>
          </button>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
