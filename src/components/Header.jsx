import React from 'react';
import Logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <div className="container">
                <img src={Logo} alt=""/>
                <NavLink to ="/restaurants">Restaurants</NavLink>
                {/* <a href="/categories">Categories</a> */}
                <NavLink to ="/categories">Categories</NavLink>
                <NavLink to="/communities">Our Community</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </div>   
        </nav> 
    )
}

export default Header;