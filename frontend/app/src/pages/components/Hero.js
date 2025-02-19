import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
      {/* Video Background */}
      <video autoPlay loop muted className="video-bg">
        <source src="/Untitled video - Made with Clipchamp.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Black Overlay */}
      <div className="overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h2>प्रेम और विश्वास का अनोखा संगम</h2>
        <p>Discover the finest handcrafted sarees</p>
        <button className="shop-btn">Shop Now</button>
      </div>
    </div>
  );
}

export default Hero;