import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./PostCard.css"; 

const PostCard = ({ post }) => {
    const { id } = useParams();
    const [postObj, setPostObj] = useState(null);

    useEffect(() => {
        if (!post) {
            fetch(`/posts/${id}`)
                .then((resp) => resp.json())
                .then((post) => setPostObj(post))
        }
    }, [post, id]);

    const finalPost = post ? post : postObj

    if (!finalPost) return <h1>Loading...</h1>

    return (
        <div className="post-card">
        <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            {/* CONDITIONALLY DISPLAY COMMENTS HERE ONLY IF WE ARE IN THE SHOW PAGE  */}
        </div>
    );
};

export default PostCard;

// useLocation hook to conditionally display comments here only if we are in the show page 
