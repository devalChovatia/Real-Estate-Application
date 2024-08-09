import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("searchTerm", searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get("searchTerm");
        if (searchTermFromURL) {
            setSearchTerm(searchTermFromURL);
        }
    }, [location.search]); 

    return (
        <header className='bg-[#abd2ff2c] shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-7'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-[#38628b]'>TerraNest</span>
                        <span className='text-[#003366]'>Realty</span>
                    </h1>
                </Link>
                <form
                    className='shadow-md p-3 rounded-lg flex items-center'
                    onSubmit={handleSubmit}
                >
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type='submit'>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:text-[#38628b] font-bold'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:text-[#38628b] font-bold'>
                            About
                        </li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                            <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="Profile" />
                        ) : (
                            <li className='hidden sm:inline text-slate-700 hover:text-[#38628b] font-bold'>Sign In</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}
