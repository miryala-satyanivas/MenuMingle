import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    table: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const tableInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredTable = tableInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredTableIsValid = !isEmpty(enteredTable);

    setFormInputsValidity({
      name: enteredNameIsValid,
      table: enteredTableIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredTableIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      table: enteredTable,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const tableControlClasses = `${classes.control} ${
    formInputsValidity.table ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={tableControlClasses}>
        <label htmlFor='table'>Table</label>
        <input type='text' id='table' ref={tableInputRef} />
        {!formInputsValidity.table && <p>Please enter a valid table number!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
