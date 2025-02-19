import React from "react";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./Abouth.css";



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
        <div className="-container">
        <img src="/IMG-20250204-WA0006l.jpg" alt="Kashvi Logo" className="kashvi-logo" />
        </div>
        
      </div>
    );
  }

const About = () => {
  return (
    <>
    <Navbar></Navbar>
    <NavLinks></NavLinks>
      <Header />
      <div className="abouth-container">
        {/* Hero Section */}
        <section className="abouth-hero">
          <div className="abouth-hero-overlay">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
            >
              About Us
            </motion.h1>

            <motion.p
              className="abouth-animated-text"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
            >
              ~ प्रेम और विश्वास का अनोखा संगम ~
            </motion.p>
          </div>
        </section>

        {/* About Us Content */}
        <section className="abouth-content">
          <motion.div
            className="abouth-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="abouth-title"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              WHO WE ARE?
            </motion.h2>

            <p style={{ fontFamily: "Cormorant Garamond" }}>
              Kashvi Creation is a premium manufacturer of exclusive designer studio sarees, offering a perfect blend of tradition and modern aesthetics. Their collection features elegant sarees crafted for every occasion, ensuring high-quality designs that cater to diverse customer preferences.
            </p>
          </motion.div>

          <div className="abouth-image">
            <img src="http://localhost:3000/KC/logo/IMG-20250204-WA0006.jpg" alt="Kashvi Creation" />
          </div>
        </section>

        {/* Key Features */}
        <section className="abouth-key-features">
          <div className="abouth-feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1048/1048949.png" alt="Handwoven Fabrics" />
            <h3>Handwoven Fabrics</h3>
            <p className="abouth-text">We use premium, ethically sourced fabrics for ultimate comfort & elegance.</p>
          </div>

          <div className="abouth-feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2950/2950732.png" alt="Designer Sarees" />
            <h3>Designer Sarees</h3>
            <p className="abouth-text">Our sarees blend heritage and contemporary fashion, creating timeless styles.</p>
          </div>

          <div className="abouth-feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/843/843264.png" alt="Customer Satisfaction" />
            <h3>Customer Satisfaction</h3>
            <p className="abouth-text">We ensure seamless shopping & top-quality products with love and trust.</p>
          </div>
        </section>

        {/* Call to Action */}
        <div className="abouth-cta">
          <h2>Explore Our Collection</h2>
          <a href="/catalogue" className="abouth-btn">Shop Now</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
