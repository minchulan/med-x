import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import { ErrorsContext } from "../context/error";
import MiniaturePostCard from "./MiniaturePostCard";
import LoadingSpinner from "../LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

const Profile = ({ loading }) => {
  const { currentUser, loggedIn, userImage, updateUserProfilePicture, updateBio } =
    useContext(UserContext);
  const { posts, loadingPosts, updateUserPostProfilePicture } =
    useContext(PostContext);
  const { setErrors } = useContext(ErrorsContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [likedPosts, setLikedPosts] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState(currentUser.bio || "");

  // Update user's profile picture
  const handleUpdateProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      setUploadingImage(true);

      // Send a request to update the user's profile picture
      fetch("/me/update_image", {
        method: "PUT",
        body: formData,
      })
        .then((resp) => resp.json())
        .then(async (data) => {
          await updateUserProfilePicture(data.image);
          await updateUserPostProfilePicture(data.image, currentUser);
          setUploadingImage(false);
        });
    }
  };

  // Update user's profile bio 
  const handleUpdateBio = () => {
    fetch("/me/update_bio", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio: newBio }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the user's bio using contextUpdateBio
        updateBio(data.bio);
        setEditingBio(false);
      })
      .catch((error) => {
        console.error("Error updating bio:", error);
      });
  };

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/login");
    }

    setErrors([]);

    const filteredLikedPosts = posts.filter((post) =>
      post.likes?.some((like) => like && like.user_id === currentUser.id)
    );
    setLikedPosts(filteredLikedPosts);
  }, [
    loading,
    loggedIn,
    navigate,
    setErrors,
    loadingPosts,
    currentUser,
    posts,
  ]);

  if (loading || !currentUser || !currentUser.posts) {
    return <LoadingSpinner />;
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
            likedPosts &&
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
          <label
            htmlFor="profile-picture-input"
            className="profile-picture-label"
          >
            <div className="camera-icon">
              <FontAwesomeIcon icon={faCamera} size="sm" />
            </div>
            <img
              src={userImage || "https://placekitten.com/150/150"}
              alt="User Avatar"
              className="profile-picture"
            />
          </label>
          <input
            id="profile-picture-input"
            type="file"
            accept="image/*"
            onChange={handleUpdateProfilePicture}
            style={{ display: "none" }}
            disabled={uploadingImage}
          />
          {uploadingImage && <LoadingSpinner />}
        </div>
        <div className="details">
          <h3>{currentUser.username}</h3>
          <p>
            <i>{currentUser.email}</i>
          </p>
        </div>
        <div className="bio">
          <br />
          {editingBio ? (
            <form className="bio-form">
              <textarea
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                placeholder="Enter your new bio..."
              />
              <div className="button-group">
                <button type="button" onClick={handleUpdateBio}>Save</button>
                <button type="button" onClick={() => setEditingBio(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <p>
              {currentUser.bio || "No bio available."}{" "}
              <button onClick={() => setEditingBio(true)}>Edit Bio</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;