import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./Collection.css";
import { Link } from "react-router-dom";


function Collection() {
  return (
    <div className="collection-section">
      <h2>Our Exclusive Collection</h2>
      <div className="collection-grid">
        {[...Array(2)].map((_, index) => (
          <div className="collection-card" key={index}></div>
        ))}
      </div>
      <div className="catalogue-btn-container">
      <Link to="/catalogue">
  <button className="catalogue-btn">
    View Catalogue <FaArrowRight className="catalogue-icon" />
  </button>
</Link>
      </div>
    </div>
  );
}
export default Collection;