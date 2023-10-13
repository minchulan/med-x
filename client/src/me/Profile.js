import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import "./Profile.css";
import { ErrorsContext } from "../context/error";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const { posts } = useContext(PostContext);
  const { setErrors } = useContext(ErrorsContext);

  useEffect(() => {
    setErrors([]);
  }, [setErrors]);

  // Filter posts made by current user
  const userPosts =
    posts && posts.filter((post) => post.user.id === currentUser.id);

  // Get all comments made by the current user from all posts
  const userComments = posts.reduce((allComments, post) => {
    const commentsWithUser = post.comments.filter(
      (comment) => comment.user && comment.user.id === currentUser.id
    );
    return allComments.concat(commentsWithUser);
  }, []);


  return (
    <div className="profile-container">
      <div className="user-info">
        <div className="avatar">
          <img src="https://placekitten.com/150/150" alt="User Avatar" />
        </div>
        <div className="details">
          <h3>{currentUser.username}</h3>
          <p>{currentUser.email}</p>
        </div>
        <div className="bio">
          <h3>Bio</h3>
          <p>
            Minchul An is a licensed pharmacist in NY and CO, and is currently a
            Software Engineering student at Flatiron School's SENG Flex Program.
            Min is passionate about building products that improve the patient
            experience.
          </p>
        </div>
      </div>
      <div className="profile-content">
        <div className="user-posts">
          <h3>Posts</h3>
          <ul>
            {userPosts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.summary}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="user-comments">
          <h3>Comments</h3>
          <ul>
            {userComments.map((comment) => (
              <li key={comment.id}>
                <Link to={`/comments/${comment.id}`}>{comment.content}</Link>
              </li>
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
