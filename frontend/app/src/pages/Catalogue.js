import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Catalogue.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const CataloguePage = () => {
  const [sarees, setSarees] = useState([]);
  const [filters, setFilters] = useState({ color: "", style: "" });
  const [showFilterModal, setShowFilterModal] = useState(false);

  // ✅ Fetch sarees from MongoDB
  useEffect(() => {
    const fetchSarees = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/catalogue");
        console.log("✅ API Response:", response.data);

        if (Array.isArray(response.data)) {
          setSarees(response.data);
        } else {
          console.error("❌ Unexpected API Response:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching sarees:", error);
      }
    };

    fetchSarees();
  }, []);

  // ✅ Apply filters
  const filteredSarees = sarees.filter((saree) => {
    return (
      (filters.color === "" || saree.color === filters.color) &&
      (filters.style === "" || saree.style === filters.style)
    );
  });

  return (
    <div className="explore-container">
      <Header />
      <h1 style={{ paddingTop: "80px" }}>Explore Our Saree Collection</h1>

      <button className="filter-button" onClick={() => setShowFilterModal(true)}>
        Filter Options
      </button>

      {/* ✅ Filter Modal */}
      {showFilterModal && (
        <div className="filter-modal">
          <div className="filter-content">
            <h2>Filter Sarees</h2>

            <label>Filter by Color:</label>
            <select
              name="color"
              value={filters.color}
              onChange={(e) => setFilters({ ...filters, color: e.target.value })}
            >
              <option value="">All Colors</option>
              <option value="Pink">Pink</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
            </select>

            <label>Filter by Style:</label>
            <select
              name="style"
              value={filters.style}
              onChange={(e) => setFilters({ ...filters, style: e.target.value })}
            >
              <option value="">All Styles</option>
              <option value="Designer">Designer Sarees</option>
              <option value="Bridal">Bridal Sarees</option>
            </select>

            <button className="apply-filter-button" onClick={() => setShowFilterModal(false)}>
              Apply Filters
            </button>
            <button className="close-filter-button" onClick={() => setShowFilterModal(false)}>
              Close
            </button>
            <button className="reset-filter-button" onClick={() => setFilters({ color: "", style: "" })}>
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* ✅ Saree Grid */}
      <div className="saree-grid">
        {filteredSarees.length > 0 ? (
          filteredSarees.map((saree) => {
            const productId = saree._id || saree.productId;
            if (!productId) return null; // Prevent rendering if no ID

            return (
              <div key={productId} className="saree-card">
                <Link to={`/product/${productId}`} state={{ saree }}>
                  <img
                    src={saree.image || "https://via.placeholder.com/200"}
                    alt={saree.name || "Saree Image"}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
                  />
                  <h3>{saree.name}</h3>
                  <p><strong>Color:</strong> {saree.color || "N/A"}</p>
                  <p><strong>Style:</strong> {saree.style || "N/A"}</p>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No sarees found matching your filters.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CataloguePage;
