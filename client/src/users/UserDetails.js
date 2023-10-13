import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/post";
import { UserContext } from "../context/user";
import "./UserDetails.css"
import MiniaturePostCard from "../me/MiniaturePostCard";

const UserDetails = () => {
  const { users, loggedIn } = useContext(UserContext);
  const { posts } = useContext(PostContext);
  const { id } = useParams();
  const userId = parseInt(id);

  if (!loggedIn) {
    return <div>Loading...</div>;
  }

  // Find the user by user ID
  const user = users.find((user) => user.id === userId);

  // Filter posts made by the specific user
  const userPosts = posts.filter((post) => post.user.id === userId);

  return (
    <div className="user-details-container">
      <div className="user-info">
        <div className="avatar">
          <img src="https://placekitten.com/150/150" alt="User Avatar" />
        </div>
        <div className="details">
          <h3>{user.username}</h3>
          <p>
            <i>{user.email}</i>
          </p>
          <br />
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="user-content">
        <div className="user-posts">
          <h3>Posts</h3>
          {/* Render MiniaturePostCard for each post */}
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
  );
};

export default UserDetails;
