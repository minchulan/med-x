import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./user";

const PostContext = createContext([]);

const PostProvider = ({ children }) => {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const { updateUserLikesCount, updateUserUnlikesCount } =
    useContext(UserContext);

  useEffect(() => {
    fetch("/posts").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setPosts(data);
          setLoadingPosts(false);
        });
      }
    });
  }, []);

  // Add post
  const addPost = (addedPost) => {
    setPosts([...posts, addedPost]);
  };

  // Edit post
  const editPost = (editedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === editedPost.id ? editedPost : post
    );
    setPosts(updatedPosts);
  };

  // Delete post
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Add comment
  const addComment = (comment) => {
    const updatedPosts = posts.map((post) =>
      post.id === comment.post.id
        ? { ...post, comments: [comment, ...post.comments] }
        : post
    );
    setPosts(updatedPosts);
  };

  // Edit comment
  const editComment = (editedComment) => {
    const updatedPosts = posts.map((post) =>
      post.id === editedComment.post.id
        ? {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === editedComment.id ? editedComment : comment
            ),
          }
        : post
    );
    setPosts(updatedPosts);
  };

  // Delete comment
  const deleteComment = (commentId, postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== commentId
            ),
          }
        : post
    );
    setPosts(updatedPosts);
  };

  // Update post's likes count and likes array to add user
  const updatePostLikesCount = (postId, newLikesCount, user) => {
    const postIndex = posts.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        likes_count: newLikesCount,
        likes: [...updatedPosts[postIndex].likes, user],
      };
      setPosts(updatedPosts);
      updateUserLikesCount(postId, newLikesCount);
    }
  };

  // const updatePostLikesCount = (postId, newLikesCount, user) => {
  //   const updatedPosts = posts.map((post) =>
  //     post.id === postId
  //       ? {
  //           ...post,
  //           likes_count: newLikesCount,
  //           likes: [...post.likes, user],
  //         }
  //       : post
  //   );
  //   setPosts(updatedPosts);
  //   // Pass the updated likes_count directly to updateUserLikesCount
  //   updateUserLikesCount(postId, newLikesCount);
  // };

  // Update post's unlikes count and likes array to remove user

  const updatePostUnlikesCount = (postId, newUnlikesCount, user) => {
    const postIndex = posts.findIndex((post) => post.id === postId);
    if (postIndex !== -1 && posts[postIndex].likes) {
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        likes_count: newUnlikesCount,
        likes: updatedPosts[postIndex].likes.filter(
          (like) => like.id !== user.id
        ),
      };
      setPosts(updatedPosts);
      updateUserUnlikesCount(postId, newUnlikesCount);
    }
  };

  // const updatePostUnlikesCount = (postId, newUnlikesCount, user) => {
  //   const updatedPosts = posts.map((post) =>
  //     post.id === postId && post.likes
  //       ? {
  //           ...post,
  //           likes_count: newUnlikesCount,
  //           likes: post.likes.filter((like) => like.id !== user.id),
  //         }
  //       : post
  //   );
  //   setPosts(updatedPosts);
  //   // Pass the updated likes_count directly to updateUserUnlikesCount
  //   updateUserUnlikesCount(postId, newUnlikesCount);
  // };

  // update post's user's profile picture
  const updateUserPostProfilePicture = (newProfilePicture, currentUser) => {
    const updatedPosts = posts.map((post) => {
      if (post.user.id === currentUser.id) {
        return {
          ...post,
          user: {
            ...post.user,
            image: newProfilePicture,
          },
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        addPost,
        editPost,
        deletePost,
        addComment,
        editComment,
        deleteComment,
        updatePostLikesCount,
        updatePostUnlikesCount,
        updateUserPostProfilePicture,
        loadingPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };


  
/*

Optimized `updatePostLikesCount` and `updatePostUnlikesCount` functions:
    Replaced map with Array.prototype.findIndex() method to find the index of the post you want to update. Allows us to directly update the specific post in the array without mapping through all posts.
        1] Array.prototype.findIndex() is used to find the index of the post with the specified postId.
        2] If the post is found (postIndex !== -1), it creates a copy of the posts array, updates the specific post, and sets the state with the updated array.
        3] It also checks if likes property is defined before performing operations on it to prevent errors in case it is undefined.
*/