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
    const updatedPosts = posts.map((post) => {
      if (editedPost.id === post.id) {
        return editedPost;
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
  };

  // Delete post
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Add comment
  const addComment = (comment) => {
    const post = posts.find((p) => p.id === comment.post.id);
    const updatedComments = [comment, ...post.comments];
    const updatedPost = { ...post, comments: updatedComments };

    const updatedPosts = posts.map((p) => {
      if (p.id === post.id) {
        return updatedPost;
      } else {
        return p;
      }
    });
    setPosts(updatedPosts);
  };

  // Edit comment
  const editComment = (editedComment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === editedComment.post.id) {
        const updatedComments = post.comments.map((comment) => {
          if (comment.id === editedComment.id) {
            return editedComment;
          } else {
            return comment;
          }
        });
        return { ...post, comments: updatedComments };
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
  };

  // Delete comment
  const deleteComment = (commentId, postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.filter(
          (comment) => comment.id !== commentId
        );
        return { ...post, comments: updatedComments };
      } else {
        return post;
      }
    });
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
