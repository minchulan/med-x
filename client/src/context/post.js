import { createContext, useState, useEffect } from "react";

const PostContext = createContext([]);

const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        fetch("/posts").then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    setPosts(data)
                })
            }
        })
    }, [])

    // Add post 
    const addPost = (addedPost) => {
        setPosts([...posts, addedPost])
    };

    // Edit post 
    const editPost = (editedPost) => {
        const updatedPosts = posts.map((post) => {
        if (editedPost.id === post.id) {
            return editedPost;
        } else {
            return post;
        }
        });
        setPosts(updatedPosts);
    };

    // Delete post 
    const deletePost = (postId) => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
    };

    // Add comment 
    const addComment = (comment) => {
        // posts array 
        const post = posts.find((p) => p.id === comment.post_id)
        const updatedComments = [...post.comments, comment];
        const updatedPost = { ...post, comments: updatedComments };

        const updatedPosts = posts.map((p) => {
            if (p.id === post.id) {
                return updatedPost;
            } else {
                return p;
            }
        })
        setPosts(updatedPosts);
    }

    return (
        <PostContext.Provider value={{ posts, setPosts, addPost, editPost, deletePost, addComment }}>
        {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostProvider };

/*
Data held in state gets passed down to our Home component. 
Home component goes to another component that uses logic to build post cards. 
From there, we can click on to our post card and move on to the next fetch. 

*/
