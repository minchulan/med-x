import React from 'react';
import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./user";

const PostContext = createContext([]);

const PostProvider = ({ children }) => {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const { updateUserLikesCount, updateUserUnlikesCount } =
    useContext(UserContext);

  useEffect(() => {
    fetch("/posts").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setPosts(data);
          setLoadingPosts(false);
        });
      }
    });
  }, []);

  // Add post
  const addPost = (addedPost) => {
    setPosts([addedPost, ...posts]);
  };

  // Edit post
  const editPost = (editedPost) => {
    const updatedPosts = posts && posts.map((post) =>
      post.id === editedPost.id ? editedPost : post
    );
    setPosts(updatedPosts);
  };

  // Delete post
  const deletePost = (postId) => {
    const updatedPosts = posts && posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Add comment
  const addComment = (comment) => {
    const updatedPosts = posts && posts.map((post) =>
      post.id === comment.post.id
        ? { ...post, comments: [comment, ...post.comments] }
        : post
    );
    setPosts(updatedPosts);
  };

  // Edit comment
  const editComment = (editedComment) => {
    const updatedPosts = posts && posts.map((post) =>
      post.id === editedComment.post.id
        ? {
            ...post,
            comments: post && post.comments.map((comment) =>
              comment.id === editedComment.id ? editedComment : comment
            ),
          }
        : post
    );
    setPosts(updatedPosts);
  };

  // Delete comment
  const deleteComment = (commentId, postId) => {
    const updatedPosts = posts && posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: post && post.comments.filter(
              (comment) => comment.id !== commentId
            ),
          }
        : post
    );
    setPosts(updatedPosts);
  };
  
  // Increment likes count 
  const updatePostLikesCount = (postId, newLikesCount, username) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post && post.id === postId) {
          return {
            ...post,
            likes_count: newLikesCount,
            likes: [...post.likes, { user: { username } }],
          };
        }
        return post;
      });
    });
    updateUserLikesCount(postId, newLikesCount);
  };

  // Decrement likes count 
  const updatePostUnlikesCount = (postId, newUnlikesCount, username) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post && post.id === postId) {
          const updatedLikes =
            post.likes &&
            post.likes.filter((like) => like && like.user?.username !== username);
          return {
            ...post,
            likes_count: newUnlikesCount,
            likes: updatedLikes || [],
          };
        }
        return post;
      });
    });
    updateUserUnlikesCount(postId, newUnlikesCount);
  };

  // update post's user's profile picture
  const updateUserPostProfilePicture = (newProfilePicture, currentUser) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.user.id === currentUser.id) {
          return {
            ...post,
            user: {
              ...post.user,
              image: newProfilePicture,
            },
          };
        }
        return post;
      });
    });
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        addPost,
        editPost,
        deletePost,
        addComment,
        editComment,
        deleteComment,
        updatePostLikesCount,
        updatePostUnlikesCount,
        updateUserPostProfilePicture,
        loadingPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };