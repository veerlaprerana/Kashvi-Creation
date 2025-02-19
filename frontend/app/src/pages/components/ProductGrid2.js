import React, { useEffect, useState, useRef } from "react";
import "./ProductGrid2.css";

function ProductGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Triggers when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="product-section" ref={sectionRef}>
      <h2 className={`animated-heading ${isVisible ? "glow" : ""}`}>FEATURED COLLECTION</h2>
      <div className="product-grid">
        {[...Array(4)].map((_, index) => (
          <div
            className={`product-card ${isVisible ? "zoom-in" : ""}`}
            key={index}
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <img 
              src={`/images/product${index + 1}.jpg`} 
              alt={`Product ${index + 1}`} 
              className="product-image"
            />
            <p>Product {index + 1}</p> {/* Placeholder for product name */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
