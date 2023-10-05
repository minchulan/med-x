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
            <Route exact path="/me" element={<Profile />} />
            <Route exact path="/users" element={<UserList />} />
            <Route exact path="/users/:id" element={<UserList />} />
            <Route exact path="/posts" element={<PostList />} />
            <Route
              exact
              path="/posts/new"
              element={<PostForm loading={loading} />}
            />
            <Route
              exact
              path="/posts/:id/edit"
              element={<PostEdit loading={loading} />}
            />
            <Route exact path="/posts/:id" element={<PostDetails />} />
            <Route
              exact
              path="/posts/:post_id/comments"
              element={<CommentsList />}
            />
            <Route exact path="/login" element={<Login loading={loading} />} />
            <Route
              exact
              path="/signup"
              element={<Signup loading={loading} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PostProvider>
      </UserProvider>
    </ErrorsProvider>
  );
}

export default App;
