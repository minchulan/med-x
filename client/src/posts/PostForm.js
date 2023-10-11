import React, { useState,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import { ErrorsContext } from "../context/error";
import "./PostForm.css";


const initialPostFormState = {
  title: "",
  content: "",
};

const PostForm = ({ loading }) => {
  const { loggedIn } = useContext(UserContext);
  const { setErrors } = useContext(ErrorsContext);
  const { addPost } = useContext(PostContext);
  const [postData, setPostData] = useState(initialPostFormState);
  const navigate = useNavigate();

  useEffect(() => {
    setErrors([]);
    
  }, [setErrors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          addPost(data);
          navigate("/posts");
        });
      } else {
        resp.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  };

  return (
    <div className="post-form-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleInputChange}
            rows="6"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
