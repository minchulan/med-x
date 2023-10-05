import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../context/post";
import { UserContext } from "../context/user";
import PostMeta from "./PostMeta";
import "./PostEdit.css";

const initialPostState = {
  title: "",
  content: "",
};

const PostEdit = ({ loading }) => {
  const { loggedIn, currentUser } = useContext(UserContext);
  const { posts, editPost } = useContext(PostContext);
  const [formData, setFormData] = useState(initialPostState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/login");
    }

    if (posts.length > 0) {
      const post = posts.find((post) => post.id === parseInt(id, 10));

      // find a post
      console.log("loading", loading);
      console.log("current user", currentUser);
      console.log("post", post);

      setFormData({
        title: post.title,
        content: post.content,
      });
    }
  }, [posts, loggedIn, currentUser, id, navigate, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate(`/posts/${id}`); // Navigate back to the specific post without saving changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          console.log(data);
          editPost(data);
          navigate(`/posts/${id}`);
        });
      }
    });
  };

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  const post = posts.find((post) => post.id === parseInt(id, 10));
  const createdAt = new Date(post.created_at).toLocaleString(); // Convert timestamp to readable date format

  return (
    <div className="post-edit-container">
      <PostMeta username={currentUser.username} createdAt={createdAt} />
      <form className="post-edit-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <input
            type="text"
            name="content"
            id="content"
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
