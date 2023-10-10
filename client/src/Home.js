import React, { useContext } from "react";
import { PostContext } from "./context/post";
import PostCard from "./posts/PostCard";
import "./Home.css"; 

const Home = () => {
  const { posts } = useContext(PostContext);

  const postCards = posts.map((post) => (
    <PostCard
      key={post.id}
      post={post}
    />
  ))

  return (
    <div className="home-container">
      <h2>Welcome to MedX</h2>
      <p>Explore health and wellness content from our community.</p>
      <hr />
      <div className="post-list">
        {postCards}
      </div>
    </div>
  );
};

export default Home;
