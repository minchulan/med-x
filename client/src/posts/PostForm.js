import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import { ErrorsContext } from "../context/error";
import "./PostForm.css";

const MAX_AMOUNT = 5; // Assuming you have a maximum limit for photos

const PostForm = () => {
  const { loggedIn, updateUserAddPost } = useContext(UserContext);
  const { setErrors } = useContext(ErrorsContext);
  const { addPost } = useContext(PostContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    photos: [], // Store photos in the form state
  });
  const navigate = useNavigate();

  useEffect(() => {
    setErrors([]);
  }, [setErrors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoEvent = (e) => {
    const uploadedPhotos = Array.from(e.target.files).slice(0, MAX_AMOUNT);
    setFormData({ ...formData, photos: uploadedPhotos });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formData.photos.forEach((photo, index) => {
      formDataToSend.append(`images[${index}]`, photo);
    });

    fetch("/posts", {
      method: "POST",
      body: formDataToSend,
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        addPost(data);
        updateUserAddPost(data);
        navigate("/posts");
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrors(["Failed to create the post. Please try again."]);
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
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="6"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photosUpload">Upload Photos:</label>
          <input
            id="photosUpload"
            type="file"
            accept=".jpg, .jpeg, .png, .webp"
            onChange={handlePhotoEvent}
            multiple
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
