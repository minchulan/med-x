import React, { useContext, useEffect } from "react";
import { ErrorsContext } from "./context/error";
import "./Errors.css";

const Errors = () => {
  const { errors, setErrors } = useContext(ErrorsContext);

  const errorsList = errors.map((error, index) => <li key={index}>{error}</li>);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [errors, setErrors]);

  return <ul className="errors-list">{errorsList}</ul>;
};

export default Errors;
