import React, { useEffect, useState, useRef, useCallback } from "react";
import "./ProductGrid1.css";

function ProductGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleIntersection = useCallback((entries) => {
    if (entries[0].isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const target = sectionRef.current;
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2, // Triggers when 20% of the section is visible
    });

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [handleIntersection]);

  return (
    <div className="product-section" ref={sectionRef}>
      <h2 className={`animated-heading ${isVisible ? "glow" : ""}`}>BEST SELLERS</h2>
      <div className="product-grid">
        {[...Array(4)].map((_, index) => (
          <a href={`/product/${index + 1}`} key={index} className="product-link">
            <div
              className={`product-card ${isVisible ? "zoom-in" : ""}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <video className="product-video" autoPlay loop muted playsInline loading="lazy">
                <source src={`/videos/product${index + 1}.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
