import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

function UserProvider({ children }) {
    const [users, setUsers] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/me')
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
            })
    }, [])

    // Signup
    const signup = (user) => {
        fetch('/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((data) => {
                        setCurrentUser(data);
                        setLoggedIn(true);
                        navigate('/me')
                    })
                }
            })
    };


    return (
        <UserContext.Provider value={{signup}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }