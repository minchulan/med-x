import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import { ErrorsContext } from "../context/error";
import MiniaturePostCard from "./MiniaturePostCard";
import LoadingSpinner from "../LoadingSpinner";
import "./Profile.css";

const Profile = ({ loading }) => {
  const { currentUser, loggedIn, updateUserProfilePicture } = useContext(UserContext);
  const { posts, loadingPosts } = useContext(PostContext);
  const { setErrors } = useContext(ErrorsContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    if (!loading && !loggedIn) {navigate("/login") }
    setErrors([]);
    if (!loadingPosts && currentUser && currentUser.posts && posts) {
      const filteredLikedPosts = posts.filter((post) =>
        post.likes.some((like) => like.user_id === currentUser.id)
      );
      console.log("filteredLikedPosts:", filteredLikedPosts);
      setLikedPosts(filteredLikedPosts);
    }
  }, [loading, loggedIn, navigate, setErrors, loadingPosts, currentUser, posts]);

  if (loading || !currentUser || !currentUser.posts) {
    return <LoadingSpinner />;
  }

  // Update user's profile picture 
  const handleUpdateProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      // Send a request to update the user's profile picture
      fetch("/me/update_image", {
        method: "PUT",
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          updateUserProfilePicture(data.image);
        });
    }
  };

  return (
    <div className="profile-container">
      <div className="main-content">
        <div className="tabs">
          <button
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={activeTab === "liked" ? "active" : ""}
            onClick={() => setActiveTab("liked")}
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
          <label htmlFor="profile-picture-input">
            <img
              src={currentUser.image || "https://placekitten.com/150/150"}
              alt="User Avatar"
            />
          </label>
          <input
            id="profile-picture-input"
            type="file"
            accept="image/*"
            onChange={handleUpdateProfilePicture}
            style={{ display: "none" }}
          />
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
