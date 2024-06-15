import React from 'react'
import { Link } from 'react-router-dom';
import googleLogo from "../img/google.webp";
import classes from "../pageCSS/Signup.module.css"

export default function Signout() {
  return (

    <div className= "p-3 max-w-lg mx-auto">
      <div className="text-3xl text-center font-semibold my-7">Sign Up</div>


      <form className="flex flex-col gap-5">
        <input type="text" placeholder='Username' className="border p-3 rounded-lg" id="username"></input>
        <input type="email" placeholder='Email' className="border p-3 rounded-lg" id="email"></input>
        <input type="password" placeholder='Password' className="border p-3 rounded-lg" id="password"></input>
        <button className="bg-[#38618bd0] text-[white] font-semibold h-10 border rounded-lg hover:opacity-90 disabled:opacity-50">Sign Up</button>
        <p>or continue with</p>
        
        <button className="bg-white text-black font-semibold h-10 border rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-start px-4">
            <img src={googleLogo} alt="Google" className="h-6 mr-2" />
            <span className="text-lg flex-grow">Google</span>
        </button>

        {/* bg-[#38618bd0] */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to={"/signin"} className="text-blue-700 hover:decoration-underline">Sign In</Link>
      </div>
    </div>
  )
}
