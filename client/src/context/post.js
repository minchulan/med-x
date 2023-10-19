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

  // Update post's likes count and likes array to add user
  const updatePostLikesCount = (postId, newLikesCount, user) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likes_count: newLikesCount,
            likes: [...post.likes, user],
          }
        : post
    );
    setPosts(updatedPosts);
    // Pass the updated likes_count directly to updateUserLikesCount
    updateUserLikesCount(postId, newLikesCount);
  };

  // Update post's unlikes count and likes array to remove user
  const updatePostUnlikesCount = (postId, newUnlikesCount, user) => {
    const updatedPosts = posts && posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likes_count: newUnlikesCount,
            likes: post && post.likes.filter((like) => like.id !== user.id),
          }
        : post
    );
    setPosts(updatedPosts);
    // Pass the updated likes_count directly to updateUserUnlikesCount
    updateUserUnlikesCount(postId, newUnlikesCount);
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
        loadingPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
