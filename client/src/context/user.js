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
        });
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
      });
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

  // Update currentUser state to add a new post
  const updateUserAddPost = (newPost) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: [...prevUser.posts, newPost],
    }));
  };

  // Update currentUser state to remove a deleted post
  const updateUserRemovePost = (postId) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: prevUser.posts.filter((post) => post.id !== postId),
    }));
  };

  // Add user
  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        login,
        logout,
        addUser,
        updateUserAddPost,
        updateUserRemovePost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
  
  
  
  
  /*

  STRETCH GOALS:
      1] `addUser` => implement a navbar link to a UsersList for admin auth only.
      
      2] // Update currentUser state to add a new comment - stretch goal (in profile page, show all comments left by user)

      3] // Update currentUser state to remove a deleted comment - stretch goal (in profile page, show all comments left by user)


  FIX:
      // Update user state to reflect post like count
      const updatePostLikeCount = (postId, newLikeCount) => {
        setCurrentUser((prevUser) => {
          const updatedPosts = prevUser.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likes_count: newLikeCount,
              };
            }
            return post;
          });
          return {
            ...prevUser,
            posts: updatedPosts,
          };
        });
      };

  */
