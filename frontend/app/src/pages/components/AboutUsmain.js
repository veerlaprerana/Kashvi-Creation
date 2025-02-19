import React from "react";
import "./AboutUsmain.css";

function AboutUs() {
    return (
      <div className="about-section">
        <div className="about-content">
          <h3 className="about-title">Our Story</h3>
          <h2 className="about-heading">About Kashvi Creation</h2>
          <p className="about-text">
          Welcome to Kashvi Creation, where tradition meets elegance.
          </p>
          <p className="about-text">
          At Kashvi Creation, we take pride in crafting exquisite sarees that blend heritage, craftsmanship, and contemporary fashion. Our journey began with a vision to bring the timeless beauty of Indian textiles to modern wardrobes.
          </p>
          <p className="about-text">
          With deep roots in India's rich weaving traditions, Kashvi Creation was founded to celebrate the artistry of skilled artisans. Every saree we offer is a masterpiece, woven with precision, care, and passion. From delicate handloom weaves to intricately embroidered designs, our collection is a tribute to the elegance of Indian ethnic wear.
          </p>
        </div>
        <div className="about-image">
          <img src="IMG-20250204-WA0006.jpg" alt="About Kashvi Creation" />
        </div>
      </div>
    );
  }

export default AboutUs;