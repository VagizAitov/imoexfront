import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";
import Reg from "./components/reg/Reg";
import AddPost from "./components/Posts/addPost/AddPost";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/post/Post";
import RouteTo from "./components/route/RouteTo";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/add-post" element={<AddPost />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/post/:idpost" element={<Post />} />
      <Route path="/registration" element={<Reg />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/" element={<RouteTo />} />
      <Route path="/main/shares/:page" element={<Main />} />
      <Route path="/main/bonds/:page" element={<Main />} />
    </Routes>
  );
}

export default App;
