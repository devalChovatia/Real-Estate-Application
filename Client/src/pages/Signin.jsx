import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import googleLogo from "../img/google.webp";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Correct usage of useDispatch
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="text-3xl text-center font-semibold my-7">Sign In</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-[#38618bd0] text-[white] font-semibold h-10 border rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <p className="mx-4 text-gray-500">or continue with</p>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't Have an Account?</p>
        <Link to={"/signup"} className="text-blue-700 hover:decoration-underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
