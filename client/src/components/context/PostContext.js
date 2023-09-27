import { createContext, useState, useEffect } from "react";

const PostContext = createContext([]);

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((resp) => resp.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  // Add Post
  const addPost = (post) => {
    setPosts([...posts, post]);
  };
  
  // Edit Post
  const editPost = (newPost) => {
    const updatedPosts = posts.map((post) => {
      if (newPost.id === post.id) {
        return newPost;
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
  };

  // Delete Post 
  const deletePost = (deletedPost) => {
    const updatedPosts = posts.filter((post) => post.id !== deletedPost.id);
    setPosts(updatedPosts);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, editPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
