import React, { useContext, useEffect } from "react";
import { ErrorsContext } from "./context/error";
import "./Errors.css";

const Errors = () => {
  const { errors, setErrors } = useContext(ErrorsContext);

  useEffect(() => {
    // Ensure errors is an array before mapping over it
    if (Array.isArray(errors) && errors.length > 0) {
      // If errors is an array and not empty, setErrors will clear the errors
      setErrors([]);
    }
  }, [errors, setErrors]);

  // Check if errors is an array before mapping
  const errorsList =
    Array.isArray(errors) && errors.length > 0
      ? errors.map((error, index) => <li key={index}>{error}</li>)
      : null;

  return (
    <ul className="errors-list">
      {errorsList}
      <br />
    </ul>
  );
};

export default Errors;

// use the useEffect hook to clear errors whenever the component is mounted or updated.

// Array.isArray() is a built-in JavaScript function that allows you to check if a given variable is an array. It returns true if the variable is an array and false if it is not. 
