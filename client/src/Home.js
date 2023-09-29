import React from "react";

const Home = () => {
  // Temporary dummy data for posts
  const posts = [
    { id: 1, title: "Post 1", content: "Content of post 1" },
    { id: 2, title: "Post 2", content: "Content of post 2" },
  ];

  return (
    <div className="home-container">
      <h2>Home</h2>
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
