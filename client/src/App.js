import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import PostList from "./posts/PostList";
import PostDetails from "./posts/PostDetails";
import Profile from "./me/Profile";
import NotFound from "./NotFound";
import PostForm from "./posts/PostForm";
import { UserProvider } from "./context/user";
import { PostProvider } from "./context/post";
import { ErrorsProvider } from "./context/error";
import Errors from "./Errors";
import CommentsList from "./comments/CommentsList";
import PostEdit from "./posts/PostEdit";
import UserList from "./users/UserList";
import UserDetails from "./users/UserDetails";
import CommentCard from "./comments/CommentCard";
import PostLikes from "./posts/PostLikes";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ErrorsProvider>
      <UserProvider setLoading={setLoading}>
        <PostProvider>
          <Navbar />
          <Errors />
          {
            loading ? <h1>Loading...</h1> :
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/me" element={<Profile loading={loading} />} />
                <Route path="/users/*" element={<UserList loading={loading} />} />
                <Route exact path="/users/:id" element={<UserDetails loading={loading} />} />
                <Route path="/posts" element={<PostList loading={loading} />} />
                <Route path="/posts/new" element={<PostForm loading={loading} />} />
                <Route path="/posts/:id/edit" element={<PostEdit loading={loading} />} />
                <Route path="/posts/:id" element={<PostDetails loading={loading} />} />
                <Route path="/posts/:postId/likes" element={<PostLikes />} />
                <Route path="/posts/:post_id/comments" element={<CommentsList />} />
                <Route path="/comments/:id" element={<CommentCard />} />
                <Route path="/login" element={<Login loading={loading} />} />
                <Route path="/signup" element={<Signup loading={loading} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          }
        </PostProvider>
      </UserProvider>
    </ErrorsProvider>
  );
}

export default App;
