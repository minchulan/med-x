import React, { useContext, useEffect } from "react";
import { ErrorsContext } from "./context/error";
import "./Errors.css"

const Errors = () => {
    const { errors, setErrors } = useContext(ErrorsContext);

    useEffect(() => {
        setErrors([]);
        
    }, [setErrors]);

    const errorsList = errors && errors.map((error, index) => <li key={index}>{error}</li>);

    return (
        <ul className="errors-list">
            {errorsList}
            <br />
        </ul>
    );
};

export default Errors;

// use the useEffect hook to clear errors whenever the component is mounted or updated.
