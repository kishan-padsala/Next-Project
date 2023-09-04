import { FormEvent, use, useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailIsValid, setEmailIsValid] = useState(false);

  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailRef.current?.value;

    // optional: validate input

    if (enteredEmail) {
      fetch("/api/newsletter-registration", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Valid email!") {
            setEmailIsValid(true);
            console.log(data.message);
          }
        });
    }
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      {emailIsValid ? (
        <p>Successfull Registration</p>
      ) : (
        <form onSubmit={registrationHandler}>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              aria-label="Your email"
              ref={emailRef}
            />
            <button>Register</button>
          </div>
        </form>
      )}
    </section>
  );
}

export default NewsletterRegistration;
