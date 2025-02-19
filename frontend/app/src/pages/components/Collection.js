import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./Collection.css";

function Collection() {
  const collections = [
    { name: "Designer Collection", image: "/images/designer-collection.jpg" },
    { name: "Bridal Collection", image: "/images/bridal-collection.jpg" }
  ];

  return (
    <div className="collection-section">
      <h2>Our Exclusive Collection</h2>
      <div className="collection-grid">
        {collections.map((collection, index) => (
          <div className="collection-card" key={index}>
            <img src={collection.image} alt={collection.name} className="collection-image" />
            <div className="collection-overlay">
              <h3>{collection.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="catalogue-btn-container">
        <button className="catalogue-btn">
          View Catalogue <FaArrowRight className="catalogue-icon" />
        </button>
      </div>
    </div>
  );
}

export default Collection;
