import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import PostCard from "./PostCard";
import "./PostList.css"; 

const PostList = () => {
    const { currentUser } = useContext(UserContext);
    const { posts } = useContext(PostContext)

    return (
        <div className="post-list-container">
        <h2>All Posts</h2>
        <div className="post-list">
            {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
            <p>No posts available.</p>
            )}
        </div>
        </div>
    );
};

export default PostList;
