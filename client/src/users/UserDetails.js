import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostContext } from '../context/post';
import { UserContext } from '../context/user';

const UserDetails = () => {
    const { users, loggedIn } = useContext(UserContext);
    const { posts } = useContext(PostContext);
    const { id } = useParams();
    const userId = parseInt(id);
    
    if (!loggedIn) {
        return <div>Loading...</div>;
    }

    // Find the user by user ID
    const user = users.find((user) => user.id === userId);

    console.log(users);
    console.log(user);
    console.log(userId);


    // Filter posts made by the specific user
    const userPosts = posts.filter((post) => post.user.id === userId);

    // Get all comments made by the specific user from all posts
    const userComments = posts.reduce((allComments, post) => {
        const commentsWithUser = post.comments.filter(
        (comment) => comment.user && comment.user.id === userId
        );
        return allComments.concat(commentsWithUser);
    }, []);

    return (
        <div className="user-details-container">
        <div className="user-info">
            <div className="avatar">
            <img src="https://placekitten.com/150/150" alt="User Avatar" />
            </div>
            <div className="details">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            </div>
        </div>
        <div className="user-content">
            <div className="user-posts">
            <h3>Posts</h3>
            <ul>
                {userPosts.map((post) => (
                <li key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.summary}</Link>
                </li>
                ))}
            </ul>
            </div>
            <div className="user-comments">
            <h3>Comments</h3>
            <ul>
                {userComments.map((comment) => (
                <li key={comment.id}>
                    <Link to={`/comments/${comment.id}`}>{comment.content}</Link>
                </li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    );
};

export default UserDetails;