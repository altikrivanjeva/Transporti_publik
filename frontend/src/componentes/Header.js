import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Make sure the path matches where you save your CSS file

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">LOGO</Link>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to="">Home</Link></li>
                    <li><Link to="/book">Book Ticket</Link></li>
                    <li><Link to="/ContactUs">Contact Us</Link></li>
                </ul>

            </nav>
        </header>
    );
}

export default Header;
