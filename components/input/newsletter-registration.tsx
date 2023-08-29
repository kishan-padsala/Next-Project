import { FormEvent, useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement>(null);
  let emailIsValid = false;
  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    // fetch user input (state or refs)
    const email = emailRef.current?.value;
    const emailData = {
      email: email,
    };
    // optional: validate input

    if (email) {
      fetch("/api/newsletter-registration", {
        method: "POST",
        body: JSON.stringify(emailData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Valid email!") {
            emailIsValid = true;
          }
        });
    }
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      {!emailIsValid ? (
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
      ) : (
        <p>Successfull Registration</p>
      )}
    </section>
  );
}

export default NewsletterRegistration;
