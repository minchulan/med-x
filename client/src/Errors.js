import React, { useContext } from 'react';
import { ErrorsContext } from './context/error';

const Errors = () => {
    const { errors } = useContext(ErrorsContext);

    const errorsList = errors.map((error, index) => <li key={index}>{error}</li>)

    return (
        <ul>
            {errorsList}
        </ul>
    )
}

export default Errors