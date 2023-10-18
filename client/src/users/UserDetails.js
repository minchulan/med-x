import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/post";
import { UserContext } from "../context/user";
import "./UserDetails.css";
import MiniaturePostCard from "../me/MiniaturePostCard";
import LoadingSpinner from "../LoadingSpinner";

const UserDetails = () => {
  const { users, loggedIn } = useContext(UserContext);
  const { posts } = useContext(PostContext);
  const { id } = useParams();
  const userId = parseInt(id);
  const [activeTab, setActiveTab] = useState("posts");

  if (!loggedIn) {
    return <LoadingSpinner />
  }

  // Find the user by user ID
  const user = users.find((user) => user.id === userId);

  // Filter posts made by the specific user
  const userPosts = posts.filter((post) => post.user.id === userId);
  const userLikedPosts = posts.filter(
    (post) =>
      post.likes.some((like) => like.user_id === userId) &&
      post.user.id !== userId
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-container">
      <div className="main-content">
        <div className="tabs">
          <button
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => handleTabChange("posts")}
          >
            Posts
          </button>
          <button
            className={activeTab === "liked" ? "active" : ""}
            onClick={() => handleTabChange("liked")}
          >
            Liked Posts
          </button>
        </div>
        <div className="miniature-post-cards">
          {activeTab === "posts" &&
            userPosts.map((post) => (
              <MiniaturePostCard
                key={post.id}
                id={post.id}
                summary={post.summary}
                image={post.image}
              />
            ))}
          {activeTab === "liked" &&
            userLikedPosts.map((post) => (
              <MiniaturePostCard
                key={post.id}
                id={post.id}
                summary={post.summary}
                image={post.image}
              />
            ))}
        </div>
      </div>
      <div className="user-info-container">
        <div className="avatar">
          <img src="https://placekitten.com/150/150" alt="User Avatar" />
        </div>
        <div className="details">
          <h3>{user.username}</h3>
          <p>
            <i>{user.email}</i>
          </p>
          <div className="bio">
            <p>{user.bio || "No bio available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
