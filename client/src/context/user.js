import React, { useState, useEffect, createContext } from "react";

const UserContext = createContext();

function UserProvider({ children, setLoading }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false); // logged out by default

    useEffect(() => {
        fetch("/me").then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                setCurrentUser(data);
                setLoggedIn(true);
                login(data);
            });
        } else {
            setLoading(false);
        }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Login
    const login = (user) => {
        setCurrentUser(user);
        setLoggedIn(true);
    };

    // Logout
    const logout = () => {
        setCurrentUser(null);
        setLoggedIn(false);
    };

    return (
        <UserContext.Provider
        value={{ loggedIn, currentUser, setCurrentUser, login, logout }}
        >
        {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };

/*
const [users, setUsers] = useState([]);

useEffect(() => {
    if (loggedIn) {
    fetch("/users")
        .then((resp) => resp.json())
        .then((data) => {
        setUsers(data);
        setLoading(false);
        });
    }
}, [loggedIn, setLoading]);

*/
