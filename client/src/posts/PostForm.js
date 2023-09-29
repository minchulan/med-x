import React, { useState } from "react";
import "./PostForm.css";

const PostForm = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      // POST '/posts/new'
      fetch('/posts/new', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData)
      })
      .then((resp) => console.log(resp))
      


    // Handle form submission, e.g., send data to API, update state, etc.
    console.log("Post data submitted:", postData);
    // Reset form fields after submission if needed
    setPostData({ title: "", content: "" });
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
            // required
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
            // required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
