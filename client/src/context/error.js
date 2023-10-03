import { createContext, useState } from "react";

const ErrorsContext = createContext({});

const ErrorsProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);

    return (
        <ErrorsContext.Provider value={{ errors, setErrors }}>
        {children}
        </ErrorsContext.Provider>
    );
};

export { ErrorsContext, ErrorsProvider };
