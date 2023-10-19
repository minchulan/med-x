import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children, setLoading }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  // Get current user
  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          login(data);
          setCurrentUser(data);
          setUserImage(data.image);
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

  // Update currentUser state to ADD a newly created post
  const updateUserAddPost = (newPost) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: [...prevUser.posts, newPost],
    }));
  };

  // Update currentUser state to UPDATE an edited post
  const updateUserEditPost = (editedPost) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: prevUser.posts.map((post) =>
        post.id === editedPost.id ? editedPost : post
      ),
    }));
  };

  // Update currentUser state to DELETE a removed post
  const updateUserRemovePost = (postId) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: prevUser.posts.filter((post) => post.id !== postId),
    }));
  };

  // Update currentUser state to increment post's likesCount (like)
  const updateUserLikesCount = (postId, newLikesCount) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: prevUser.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes_count: newLikesCount,
              liked: true, // Set liked to true when the user likes the post
            }
          : post
      ),
    }));
  };

  // Update currentUser state to decrement post's likesCount (unlike)
  const updateUserUnlikesCount = (postId, newUnlikesCount) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      posts: prevUser.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes_count: newUnlikesCount,
              liked: false, // Set liked to false when the user unlikes the post
            }
          : post
      ),
    }));
  };
  console.log(currentUser);

  // Update currentUser state with the new profile picture
  const updateUserProfilePicture = (newImageUrl) => {
    setUserImage(newImageUrl);
    setCurrentUser((prevUser) => ({
      ...prevUser,
      image: newImageUrl,
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
        currentUser: { ...currentUser, image: userImage },
        setCurrentUser,
        users,
        setUsers,
        login,
        logout,
        addUser,
        updateUserAddPost,
        updateUserEditPost,
        updateUserRemovePost,
        updateUserLikesCount,
        updateUserUnlikesCount,
        updateUserProfilePicture,
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
