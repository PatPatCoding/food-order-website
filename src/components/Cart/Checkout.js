import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => {
  return value.trim() === "";
};
const hasFiveChars = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const [inputState, setInputState] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = hasFiveChars(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);

    setInputState({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });
    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;
    if (!formIsValid) {
      return;
    } else {
      props.onConfirm({
        enteredName,
        enteredStreet,
        enteredPostal,
        enteredCity,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div
        className={`${classes.control} ${
          inputState.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Name</label>
        <input ref={nameInputRef} type="text" id="name"></input>
        {!inputState.name && <p>Please enter your name.</p>}
      </div>
      <div
        className={`${classes.control} ${
          inputState.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street"></input>
        {!inputState.street && <p>Please enter your street.</p>}
      </div>
      <div
        className={`${classes.control} ${
          inputState.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal"></input>
        {!inputState.postal && <p>Please enter your postal code.</p>}
      </div>
      <div
        className={`${classes.control} ${
          inputState.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city"></input>
        {!inputState.city && <p>Please enter your city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
