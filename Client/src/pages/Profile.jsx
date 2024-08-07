import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserStart, signoutUserSuccess, signoutUserFailure } from '../redux/user/userSlice.js';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
  });
  const dispatch = useDispatch();
  const [listingError, setListingError] = useState(false)
  const [userListings, setUserListings] = useState([])
  
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => { setFileUploadError(true); },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true)
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async(e) =>{
    try {
      dispatch(deleteUserStart())
       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    if(data.success === false){
      dispatch(deleteUserFailure(data.message))
    }
    dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    } 
  }

  const handleSignout = async(e) =>{
    try {
      dispatch(signoutUserStart())
       const res = await fetch(`/api/auth/signout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    if(data.success === false){
      dispatch(deleteUserFailure(data.message))
    }
    dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    } 
  }

  const handleShowListings = async () =>{
    try {
      setListingError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if(data.success === false){
        setListingError(true)
        return
      }
      setUserListings(data)
    } catch (error) {
      setListingError(true)
    }
  }

  const handleDeleteListing = async (listingId) =>{
    try {
      setListingError(false)
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE"
      })
      const data = await res.json()
      if(data.success === false) {
        console.log(data.message)
        return
      }
      setUserListings(((prev) => prev.filter((listing) => listing._id !== listingId)))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error While Uploading Image (image must be less than 2mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image Successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          value={formData.username}
          id="username"
          className="border p-1 rounded-lg mt-2"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          value={formData.email}
          id="email"
          className="border p-1 rounded-lg mt-2"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-1 rounded-lg mt-2"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-[#003366] mt-2 text-white rounded-lg disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
        
      </form>
      <Link to="/createListing">
      <button className="mt-2 border rounded-lg w-full">Create Listing </button>
      </Link>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
        <p className = "text-green-700 ">{updateSuccess ? "User is updated successfully!" :"" }</p>
      <button onClick={handleShowListings}className="border w-full mt-3 rounded-lg bg-[#003366] text-white">Show Listings</button>
      <p className="text-red-700">{listingError ? "Error Showing Listings" : ""}</p>
    <h1 className="font-semibold text-2xl text-center mt-10"> Your Listings</h1>
      {userListings && userListings.length > 0 && userListings.map((listing) =>
        
        <div key={listing._id} className="border  mt-5 flex flex-wrap gap-4 rounded-lg p-3 justify-between items-center">
          
          <Link to={`/listings/${listing._id}`}>
            <img className="h-20 w-20 object-contain " src={listing.imageUrls[0]} alt="listing images"></img>
          </Link>

          <Link to={`/listing/${listing._id}`} className="flex-1">
            <p className="text-slate-700 font-semibold  hover:underline truncate">{listing.name}</p>
          </Link>

          <div className="flex flex-col ">
            <button onClick={() =>handleDeleteListing(listing._id)} className="text-red-700">Delete</button>
            <Link to={`/updateListing/${listing._id}`}>
              <button className="text-green-700">Edit</button>
            </Link>
          </div>

        </div>
    )}

    
    </div>

    
  );
}
