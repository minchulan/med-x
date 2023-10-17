import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import "./Profile.css";
import { ErrorsContext } from "../context/error";
import MiniaturePostCard from "./MiniaturePostCard";

const Profile = ({ loading }) => {
  const { currentUser, loggedIn } = useContext(UserContext);
  const { posts } = useContext(PostContext);
  const { setErrors } = useContext(ErrorsContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts"); // Default active tab is "posts"
  const [likedPosts, setLikedPosts] = useState([]);

  console.log(currentUser)


  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/login");
    }
    setErrors([]);
  }, [loading, loggedIn, navigate, setErrors]);

  // Filter liked posts whenever posts or currentUser changes
  useEffect(() => {
    const filteredLikedPosts = posts?.filter((post) =>
      post.likes.some((like) => like.user_id === currentUser?.id)
    );
    setLikedPosts(filteredLikedPosts);
  }, [posts, currentUser]);

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
            Liked
          </button>
        </div>
        <div className="miniature-post-cards">
          {activeTab === "posts" &&
            currentUser.posts.map((post) => (
              <MiniaturePostCard
                key={post.id}
                id={post.id}
                summary={post.summary}
              />
            ))}
          {activeTab === "liked" &&
            likedPosts.map((post) => (
              <MiniaturePostCard
                key={post.id}
                id={post.id}
                summary={post.summary}
              />
            ))}
        </div>
      </div>
      <div className="user-info-container">
        <div className="avatar">
          <img src="https://placekitten.com/150/150" alt="User Avatar" />
        </div>
        <div className="details">
          <h3>{currentUser.username}</h3>
          <p>
            <i>{currentUser.email}</i>
          </p>
        </div>
        <div className="bio">
          <br />
          <p>{currentUser.bio || "No bio available."}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
