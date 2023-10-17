import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children, setLoading }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Get current user
  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          console.log(data)
          login(data);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [setLoading, setCurrentUser]);

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
    navigate("/");
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

  // Update currentUser state to increment likesCount (like)
  const updateUserLikeCount = (postId, likesCount) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: prevUser.posts.map((post) =>
        post.id === postId
          ? { ...post, likes_count: likesCount}
          : post
      ),
    }));
  };

  // Update currentUser state to decrement likesCount (unlike)
  const updateUserUnlikeCount = (postId, likesCount) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: prevUser.posts.map((post) =>
        post.id === postId
          ? { ...post, likes_count: likesCount}
          : post
      ),
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
        updateUserLikeCount,
        updateUserUnlikeCount,
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
