import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-container">
      {/* Hamburger Menu Icon for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>  {/* Fixed syntax */}
      <li onClick={() => setMenuOpen(false)}>
    <Link to="/">Home</Link>
  </li>
  <li onClick={() => setMenuOpen(false)}>
    <Link to="/shop">Shop</Link>
  </li>
  <li onClick={() => setMenuOpen(false)}>
    <Link to="/about">About</Link>
  </li>
  <li onClick={() => setMenuOpen(false)}>
    <Link to="/blogs">Blogs</Link>
  </li>
  <li onClick={() => setMenuOpen(false)}>
    <Link to="/contact">Contact</Link>
  </li>
      </ul>

      {/* Icons */}
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
    </header>
  );
}

export default Header;
