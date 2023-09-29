import React from "react";
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

function App() {

  return (
    <main className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/posts" element={<PostList />} />
        <Route exact path="/posts/:id" element={<PostDetails />} />
        <Route exact path="/comments/:id" element={<CommentEdit />} />
        <Route exact path="/posts/:post_id/comments" element={<CommentForm />} />
        <Route exact path="/me" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
