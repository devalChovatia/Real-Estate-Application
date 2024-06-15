import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";

export default function  () {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element ={<Home/>} />
    <Route path="/signin" element ={<Signin/>} />
    <Route path="/signup" element ={<Signup/>} />
    <Route path="/about" element ={<About/>} />
    <Route path="/profile" element ={<Profile/>} />
  </Routes>
  </BrowserRouter>
}
