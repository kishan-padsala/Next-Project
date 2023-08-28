import React, { FormEvent, useRef, useState } from "react";

const AddNewEvent = () => {
  const [eventImage, setEventImage] = useState("images/coding-event.jpg");
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventImage(e.target.value);
  };

  const title = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const isFeatured = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const eventTitle = title.current?.value;
    const eventDate = date.current?.value;
    const eventLocation = location.current?.value;
    const eventDescription = description.current?.value;
    let eventIsFeatured: string | boolean | undefined =
      isFeatured.current?.value;

    if (eventIsFeatured === "on") {
      eventIsFeatured = true;
    } else {
      eventIsFeatured = false;
    }

    const id = Math.random().toString(36).substring(2, 7);
    const event = {
      date: eventDate,
      description: eventDescription,
      id: id,
      image: eventImage,
      isFeatured: eventIsFeatured,
      location: eventLocation,
      title: eventTitle,
    };

    const sendData = async () => {
      const response = await fetch(
        "https://react-http-10be4-default-rtdb.firebaseio.com/events.json",
        {
          method: "POST",
          body: JSON.stringify(event),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
    };

    sendData();
  };

  return (
    <div className="login-box">
      <h2>Add Event</h2>
      <form onSubmit={submitHandler}>
        <div className="user-box">
          <input type="text" name="" required ref={title} />
          <label>Title</label>
        </div>
        <div className="user-box">
          <input type="date" name="" required ref={date} />
        </div>
        <div className="user-box">
          <input type="text" name="" required ref={location} />
          <label>Location</label>
        </div>
        <div className="user-box">
          <input type="text" name="" required ref={description} />
          <label>Description</label>
        </div>
        <div>
          <input
            id="image1"
            type="radio"
            name="image"
            required
            value="images/coding-event.jpg"
            checked={eventImage === "images/coding-event.jpg"}
            onChange={onOptionChange}
          />
          <label>Image</label>
        </div>
        <div>
          <input
            id="image2"
            type="radio"
            name="image"
            required
            value="images/introvert-event.jpg"
            checked={eventImage === "images/introvert-event.jpg"}
            onChange={onOptionChange}
          />
          <label>Image</label>
        </div>
        <div>
          <input
            id="image3"
            type="radio"
            name="image"
            required
            value="images/extrovert-event.jpg"
            checked={eventImage === "images/extrovert-event.jpg"}
            onChange={onOptionChange}
          />
          <label>Image</label>
        </div>
        <div className="isfeatured">
          <input type="checkbox" name="checkbox" ref={isFeatured} />
          <label>IsFeatured</label>
        </div>

        <button>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewEvent;