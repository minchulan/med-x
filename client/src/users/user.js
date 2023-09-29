import React, { useState, useEffect, createContext } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
    const [users, setUsers] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetch('/me')
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
            })
    }, [])

    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext, UserProvider }