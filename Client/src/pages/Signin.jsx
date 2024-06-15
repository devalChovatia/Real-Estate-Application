import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import googleLogo from "../img/google.webp";


export default function Signin() {
  return (
    <div className= "p-3 max-w-lg mx-auto">
      <div className="text-3xl text-center font-semibold my-7">Sign In</div>

      <form className="flex flex-col gap-5">
        <input type="text" placeholder='Username' className="border p-3 rounded-lg" id="username"></input>
        <input type="email" placeholder='Email' className="border p-3 rounded-lg" id="email"></input>
        <input type="password" placeholder='Password' className="border p-3 rounded-lg" id="password"></input>
        
        <button className="bg-[#38618bd0] text-[white] font-semibold h-10 border rounded-lg hover:opacity-90 disabled:opacity-50">Sign In</button>
      
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <p className="mx-4 text-gray-500">or continue with</p>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
        
        <button className="bg-white text-black font-semibold h-10 border rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-start px-4">
            <img src={googleLogo} alt="Google" className="h-6 mr-2" />
            <span className="text-lg flex-grow">Google</span>
        </button>

      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't Have an Account?</p>
        <Link to={"/signup"} className="text-blue-700 hover:decoration-underline">Sign Up</Link>
      </div>
    </div>
  )
}
