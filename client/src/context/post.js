import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./user";

const PostContext = createContext([]);

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { updateUserLikeCount, updateUserUnlikeCount } =
    useContext(UserContext);

  useEffect(() => {
    fetch("/posts").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setPosts(data);
        });
      }
    });
  }, []);

  // Add post
  const addPost = (addedPost) => {
    setPosts([...posts, addedPost]);
  };

  // Edit post
  const editPost = (editedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === editedPost.id ? editedPost : post
    );
    setPosts(updatedPosts);
  };

  // Delete post
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Add comment
  const addComment = (comment) => {
    const updatedPosts = posts.map((post) =>
      post.id === comment.post.id
        ? { ...post, comments: [comment, ...post.comments] }
        : post
    );
    setPosts(updatedPosts);
  };

  // Edit comment
  const editComment = (editedComment) => {
    const updatedPosts = posts.map((post) =>
      post.id === editedComment.post.id
        ? {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === editedComment.id ? editedComment : comment
            ),
          }
        : post
    );
    setPosts(updatedPosts);
  };

  // Delete comment
  const deleteComment = (commentId, postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== commentId
            ),
          }
        : post
    );
    setPosts(updatedPosts);
  };

    
  // Update the post's likes_count when liked (incremented like count)
  const updatePostLikeCount = (postId, newIncrementedLikeCount) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, likes_count: newIncrementedLikeCount }
        : post
    );
    setPosts(updatedPosts);

    // Pass the updated likes_count directly to updateUserLikeCount
    updateUserLikeCount(postId, newIncrementedLikeCount);
  };

  // Update the post's likes_count when unliked (decremented like count)
  const updatePostUnlikeCount = (postId, newDecrementedLikeCount) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, likes_count: newDecrementedLikeCount }
        : post
    );

    setPosts(updatedPosts);

    // Pass the updated likes_count directly to updateUserUnlikeCount
    updateUserUnlikeCount(postId, newDecrementedLikeCount);
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
        updatePostLikeCount,
        updatePostUnlikeCount
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
