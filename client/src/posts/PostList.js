import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/user";
import PostCard from "./PostCard";
import "./PostList.css"; 

const PostList = () => {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts from the API endpoint
    fetch("/posts")
      .then((resp) => resp.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="post-list-container">
      <h2>All Posts</h2>
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
