import React, { useState, useEffect, createContext } from "react";

const UserContext = createContext();

function UserProvider({ children, setLoading }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          login(data);
        })
      } else {
        setLoading(false);
      }
    });
  }, [setLoading]);


  // Get all users
  useEffect(() => {
    if (loggedIn) {
      fetch("/users").then((resp) => {
        if (resp.ok) {
          resp.json().then((data) => {
            setUsers(data);
            setLoading(false);
          });
        }
      })
    }
  }, [loggedIn, setLoading]);

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

  // Add user
  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <UserContext.Provider
      value={{ loggedIn, currentUser, setCurrentUser, users, setUsers, login, logout, addUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

/*

  ** authorization - restricting access **
  - if our currentUser is set in state, allow access to our website. however, if currentUser is not set in state, redirect to login page. 

  - check to see if our user is logged in by making a request to backend to see if that user is saved in sessions. 

  - when our user logs in, we put user id in sessions. every time we go to a particular page, we are going to take a look at user context. every time user context loads, we want it to verify to see if a user is logged in. upon mount, we make a request to our backend to check to see if there's actually something in sessions. if a user is successfully in sessions, then let frontend know that user is still logged in. thus, current user will still be set to state, otherwise clear our user. 


*/
