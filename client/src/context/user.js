import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children, setLoading }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false); // logged out by default
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/me").then((resp) => {
            if (resp.ok) {
            resp.json().then((data) => {
            console.log(data);
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
        navigate('/me')
    };

    // Logout
    const logout = () => {
        setCurrentUser(null);
        setLoggedIn(false);
        navigate('/');
    };

    // Signup
    const signup = (newUser) => {
        fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
        }).then((resp) => {
        if (resp.ok) {
            resp.json().then((data) => {
            setCurrentUser(data);
            setLoggedIn(true);
            navigate("/me");
            });
        } else {
            resp.json().then((data) => {
                Object.entries(data.errors).map((e) => `${e[0]} : ${e[1]}`); 
            })
        }
        });
    };

    return (
        <UserContext.Provider
        value={{ loggedIn, currentUser, setCurrentUser, login, logout, signup }}
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
