import React, { useContext, useEffect } from "react";
import { PostContext } from "./context/post";
import PostCard from "./posts/PostCard";
import { ErrorsContext } from "./context/error";
import "./Home.css"; 

const Home = () => {
  const { posts } = useContext(PostContext);
  const { setErrors } = useContext(ErrorsContext);

  useEffect(() => {
    setErrors([]);
  }, [setErrors]);

  const postCards = posts.map((post) => (
    <PostCard
      key={post.id}
      post={post}
    />
  ))

  return (
    <div className="home-container">
      <h2>Welcome to MedX</h2>
      <p>Explore health and wellness content from our medical community.</p>
      <hr />
      <div className="post-list">
        {postCards}
      </div>
    </div>
  );
};

export default Home;
