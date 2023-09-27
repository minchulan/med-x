import React, { useContext } from "react";
import { ErrorsContext } from "../../context/ErrorsContext";

const Errors = () => {
  const { errors } = useContext(ErrorsContext);
  const errorLis = errors.map((error, idx) => <li key={idx}>{error}</li>);
  return <ul>{errorLis}</ul>;
};

export default Errors;
