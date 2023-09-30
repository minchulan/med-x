import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Navbar';
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import PostList from "./posts/PostList";
import PostDetails from "./posts/PostDetails";
import CommentEdit from "./comments/CommentEdit";
import CommentForm from "./comments/CommentForm";
import Profile from "./me/Profile";
import NotFound from "./NotFound";
import PostForm from "./posts/PostForm";
import { UserProvider } from "./context/user";
import { PostProvider } from "./context/post";
import { ErrorsProvider } from "./context/error";
import Errors from "./Errors";
import CommentsList from "./comments/CommentsList";

function App() {
  const [loading, setLoading] = useState(true); // ensures app is completely loaded when running other components

  return (
    <ErrorsProvider>
      <UserProvider setLoading={setLoading}>
        <PostProvider>
          <Navbar />
          <Errors />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/posts" element={<PostList />} />
                <Route exact path="/posts/new" element={<PostForm loading={loading} />} />
                <Route exact path="/posts/:id" element={<PostDetails />} />
                <Route exact path="/comments/:id" element={<CommentEdit />} />
                <Route exact path="/posts/:post_id/comments" element={<CommentsList />} />
                <Route exact path="/login" element={<Login loading={loading}/>} />
                <Route exact path="/signup" element={<Signup loading={loading} />} />
                <Route exact path="/me" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
        </PostProvider>
      </UserProvider>
    </ErrorsProvider>
  );
}

export default App;
