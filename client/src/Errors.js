import React, { useContext, useEffect } from "react";
import { ErrorsContext } from "./context/error";
import "./Errors.css"

const Errors = () => {
  const { errors, setErrors } = useContext(ErrorsContext);

  useEffect(() => {
    setErrors([]);
  }, [setErrors]);

  const errorsList =
    errors && errors.map((error, index) => <li key={index}>{error}</li>);

  return (
    <div className="errors-container">
      <ul className="errors-list">{errorsList}</ul>
    </div>
  );
};

export default Errors;

