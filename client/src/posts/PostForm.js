import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { ErrorsContext } from "../context/error";
import "./PostForm.css";
import { PostContext } from "../context/post";

const initialPostFormState = {
    title: "",
    content: "",
}

const PostForm = () => {
    const { loggedIn } = useContext(UserContext);
    const { errors, setErrors } = useContext(ErrorsContext);
    const { addPost } = useContext(PostContext);
    const [postData, setPostData] = useState(initialPostFormState);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    // Add new post 
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        })
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((data) => {
                        addPost(data)
                        navigate("/posts")
                    })
                } else {
                    resp.json().then((data) => {
                        setErrors(data.errors)
                    })
            }
        })

    };

    return (
        <div className="post-form-container">
        {errors && errors.length > 0 && (
            <div className="error-container">
            <ul className="error-list">
                {errors.map((error, index) => (
                <li key={index}>{error}</li>
                ))}
            </ul>
            </div>
        )}
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
