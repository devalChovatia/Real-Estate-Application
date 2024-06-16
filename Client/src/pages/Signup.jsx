import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import googleLogo from "../img/google.webp";
import OAuth from '../components/OAuth.jsx';

export default function Signup() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  console.log(formData);

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("api/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data)
    if(data.success ===false){
      setLoading(false);
      setError(data.message);
      
      return;
    }
    setLoading(false);
    setError(null);
    navigate("/signin")
    
  }
    catch (error) {
      console.log(error.message)
    }
  }



  return (

    <div className= "p-3 max-w-lg mx-auto">
      <div className="text-3xl text-center font-semibold my-7">Sign Up</div>


      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input type="text" placeholder='Username' className="border p-3 rounded-lg" id="username" onChange={handleChange}></input>
        <input type="email" placeholder='Email' className="border p-3 rounded-lg" id="email" onChange={handleChange}></input>
        <input type="password" placeholder='Password' className="border p-3 rounded-lg" id="password" onChange={handleChange}></input>
        
        <button disabled={loading} className="bg-[#38618bd0] text-[white] font-semibold h-10 border rounded-lg hover:opacity-90 disabled:opacity-50">{loading ? "Loading..." : "Sign Up"}</button>
      
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <p className="mx-4 text-gray-500">or continue with</p>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
        <OAuth/>


      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to={"/signin"} className="text-blue-700 hover:decoration-underline">Sign In</Link>
      </div>
    </div>
  )
}

