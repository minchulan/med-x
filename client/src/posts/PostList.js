import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import PostCard from "./PostCard";
import "./PostList.css"; 

// EXPLORE PAGE 
const PostList = ({ loading }) => {
    const { loggedIn } = useContext(UserContext);
    const { posts, deletePost } = useContext(PostContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!loading && !loggedIn) {
            navigate('/login')
        }
    }, [loading, loggedIn, navigate])

    const postCards = posts.map((post) => (
        <PostCard
            key={post.id}
            post={post}
            deletePost={deletePost}
        />
    ))

    return (
        <div className="post-list-container">
        <h2>Posts </h2>
        <div className="post-list">
           {postCards} 
        </div>
        </div>
    );
};

export default PostList;
