import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const { posts } = useContext(PostContext);

  // Filter posts made by current user
  const userPosts = posts.filter((post) => post.user.id === currentUser.id);

  // Get all comments made by the current user from userPosts
  const userComments = userPosts.reduce(
    (allComments, post) =>
      // Concatenate comments from all userPosts into one array
      allComments.concat(post.comments),
    []
  );

  return (
    <div className="profile-container">
      <div className="user-info">
        <div className="avatar">
          <img
            src="https://placekitten.com/150/150" // Example image
            alt="User Avatar"
          />
        </div>
        <div className="details">
          <h3>{currentUser.username}</h3>
          <p>{currentUser.email}</p>
        </div>
      </div>
      <div className="profile-content">
        {" "}
        {/* Added profile-content class */}
        <div className="bio">
          <h3>Bio</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
            purus justo. Vestibulum ultricies, libero non ullamcorper malesuada,
            erat ex pellentesque elit.
          </p>
        </div>
        <div className="user-posts">
          <h3>Posts</h3>
          <ul>
            {userPosts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
        <div className="user-comments">
          <h3>Comments</h3>
          <ul>
            {userComments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// use activeStorage for image handling
// use to upload profile pictures
// or image attachment for posts

/*
import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const { posts } = useContext(PostContext); // Get posts data from context

  // Filter posts made by the current user
  const userPosts = posts.filter((post) => post.user.id === currentUser.id);

  // Get all comments made by the current user from userPosts
  const userComments = userPosts.reduce((allComments, post) => {
    // Concatenate comments from all userPosts into one array
    return allComments.concat(post.comments);
  }, []);

  return (
    <div className="profile-container">
      <div className="bio">
        <h3>Bio</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
          purus justo. Vestibulum ultricies, libero non ullamcorper malesuada,
          erat ex pellentesque elit.
        </p>
      </div>
      <div className="user-posts">
        <h3>Posts</h3>
        <ul>
          {userPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
      <div className="user-comments">
        <h3>Comments</h3>
        <ul>
          {userComments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;

*/
