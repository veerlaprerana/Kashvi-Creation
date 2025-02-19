import React, { useState } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="nav-container">
      {/* Hamburger Menu Icon for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li onClick={() => setMenuOpen(false)}>Home</li>
        <li onClick={() => setMenuOpen(false)}>Shop</li>
        <li onClick={() => setMenuOpen(false)}>About</li>
        <li onClick={() => setMenuOpen(false)}>Blogs</li>
        <li onClick={() => setMenuOpen(false)}>Contact</li>
      </ul>

      {/* Icons with Links */}
      <div className="nav-icons">
        <Link to="/search">
          <FaSearch className="icon" title="Search" />
        </Link>
        <Link to="/account">
          <FaUser className="icon" title="Account" />
        </Link>
        <Link to="/wishlist">
          <FaHeart className="icon" title="Wishlist" />
        </Link>
        <Link to="/cart">
          <FaShoppingCart className="icon" title="Cart" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
