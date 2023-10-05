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
          setCurrentUser(data);
          setLoggedIn(true);
          fetchUsers();
        });
      } else {
        setLoading(false);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get all users
  const fetchUsers = () => {
    fetch("/users").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          console.log(data);
          setUsers(data);
          setLoading(false);
        });
      } else {
        resp.json().then((data) => {
          console.log(data);
        });
      }
    });
  };

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
      value={{ loggedIn, currentUser, setCurrentUser, login, logout, addUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

/*


*/
