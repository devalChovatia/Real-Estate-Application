import React from 'react';
import classes from "../componentCSS/Header.module.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className={classes.NavBar}>
        <div className={classes.NavBarOrientation}>
            <Link to="/">
                <div className={classes.Logo}>
                    <span className={classes.firstLogo}>TerraNest</span>
                    <span className={classes.secondLogo}>Realty</span>
                </div>
            </Link>
            <form className={classes.SearchBar}>
                <input type="text" placeholder="Search..."></input>
                <FaSearch className={classes.SearchIcon}/>
            </form>
            <ul className={classes.links}>
                <Link to="/"><li className={classes.HomeButton}>Home</li></Link>
                <Link to="/about"><li className={classes.AboutButton}>About</li></Link>
                <Link to="/signin"><li className={classes.SigninButton}>Signin</li></Link>
            </ul>
        </div>
        

    </nav>
  )
}
