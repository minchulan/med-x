import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/login");
    }

    setErrors([]);
  }, [loading, loggedIn, navigate, setErrors]);

  // Check if currentUser is available
  if (loading || !loggedIn || !currentUser) {
    // Render loading state or redirect to login page
    return loading ? <div>Loading...</div> : null;
  }

  // Filter posts made by current user
  const userPosts = posts?.filter((post) => post.user?.id === currentUser?.id);
  
  return (
    <div className="profile-container">
      <div className="user-info">
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
      <div className="profile-content">
        <div className="user-posts">
          <h2>Overview</h2>
          <h4>Posts</h4>
          <div className="miniature-post-cards">
            {userPosts.map((post) => (
              <MiniaturePostCard
                key={post.id}
                id={post.id}
                summary={post.summary}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// use activeStorage for image handling
// use to upload profile pictures
// or image attachment for posts
