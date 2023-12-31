import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../context/post";
import { UserContext } from "../context/user";
import PostMeta from "./PostMeta";
import "./PostEdit.css";
import LoadingSpinner from "../LoadingSpinner";

const initialPostState = {
  title: "",
  content: "",
};

const PostEdit = ({ loading }) => {
  const { loggedIn, currentUser, updateUserEditPost } = useContext(UserContext);
  const { posts, editPost } = useContext(PostContext);
  const [formData, setFormData] = useState({...initialPostState});
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !loggedIn) return navigate("/login");

    if (posts.length > 0) {
      const post = posts.find((post) => post.id === postId);
      // Check if the logged-in user is the owner of the post
      if (post.user.id !== currentUser.id) return navigate(`/posts/${postId}`);
      setFormData({ title: post.title, content: post.content });
    }
  }, [posts, loggedIn, currentUser, id, navigate, loading, postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleCancel = () => {
    navigate(`/posts/${postId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          editPost(data);
          updateUserEditPost(data);
          navigate(`/posts/${id}`);
        });
      }
    });
  };

  const post = posts.find((post) => post.id === parseInt(id, 10));
  const createdAt = new Date(post?.created_at).toLocaleString(); // Convert timestamp to readable date format

  if (posts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="post-edit-container">
      <PostMeta username={currentUser.username} createdAt={createdAt} />
      <form className="post-edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="content-box"
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <div className="button-group">
          <input type="submit" value="Update Post" />
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
