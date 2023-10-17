import { createContext, useState, useEffect } from "react";

const PostContext = createContext([]);

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

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

  // Update like count
    const updateLikeCount = (postId, newLikeCount) => {
        console.log(postId)
        console.log(newLikeCount)

        const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, likes_count: newLikeCount } : post
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
        updateLikeCount,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
