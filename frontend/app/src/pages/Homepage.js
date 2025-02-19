import React from "react";

import "./Homepage.css";
// import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid1";
import ProductGrid2 from "./components/ProducGrid2";
import Collection from "./components/Collection";
import AboutUs from "./components/AboutUsmain";
import Footer from "./components/Footer";


function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Welcome to Kashvi Creation</h1>
    </nav>
  );
}

function NavLinks() {
  // const navigate = useNavigate();
  return (
    <div className="nav-links-wrapper">
      {/* <div classname =""></div> */}
      <div className="logo-container">
      <img src="/IMG-20250204-WA0006l.jpg" alt="Kashvi Logo" className="kashvi-logo" />
      </div>
      
    </div>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <NavLinks/>
      <Header/>
      <Hero/>
      <ProductGrid />
      <ProductGrid2/>
      <Collection/>
      <AboutUs/>
      <Footer/>
    </div>
  );
}

export default App;
