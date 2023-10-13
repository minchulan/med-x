import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/post";
import { UserContext } from "../context/user";
import PostCard from "./PostCard";

const UserPostDetails = () => {
    const [user, setUser] = useState(null);
    const { user_id } = useParams(); // /users/:user_id/posts
    const { currentUser, users } = useContext(UserContext);
    const { deletePost } = useContext(PostContext);

    useEffect(() => {
        const selectUser = users.find((u) => u.id === user_id);
        setUser(selectUser);
    }, [users, user_id]);

    console.log(users);
    console.log(user_id);


    const postCards = user && user.posts.map((post) => (
        <PostCard
            key={post.id}
            post={post}
            deletePost={deletePost}
            currentUser={currentUser}
        />
    ));

    return (
        <div>
            <h1>User Details Page</h1>
            {postCards}  
        </div>
    );
};

export default UserPostDetails;
