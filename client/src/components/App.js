import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import PostDetails from "./posts/PostDetails";
import PostEdit from "./posts/PostEdit";
import PostForm from "./posts/PostForm";
import PostList from "./posts/PostList";
import UserList from "./users/UserList";
import UserPostDetails from "./users/UserPostDetails";
import "./App.css";
import NotFound from "./NotFound";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      <Navbar />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/users" element={<UserList />} />
          <Route
            exact
            path="/users/:user_id/posts"
            element={<UserPostDetails />}
          />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </main>
  );
};

export default App;
