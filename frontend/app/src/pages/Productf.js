import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./Productf.css";
import axios from "axios";

function Productf() {
    const [email, setEmail] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const initialProduct = location.state?.saree;
  const [product, setProduct] = useState(initialProduct || null);
  const [img, setImg] = useState(initialProduct?.image || "");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // ✅ Fetch user data from localStorage safely
    const userData = localStorage.getItem("user");
  
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setEmail(user.email || null);
        console.log("🔹 Email set to:", user.email);
      } catch (error) {
        console.error("❌ Error parsing user data:", error);
      }
    } else {
      console.warn("⚠️ No user data found in localStorage.");
    }
  
    // ✅ Fetch product details if not in state
    if (!initialProduct) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/products/${id}`);
          if (!response.ok) throw new Error("Failed to fetch product");
          const data = await response.json();
          setProduct(data);
          setImg(data.image);
          console.log("✅ Product data fetched:", data);
        } catch (error) {
          console.error("❌ Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id, initialProduct]);  // ✅ Dependencies are correct  

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ Add to Cart
  const addToCart = async () => {
    if (!email) {
      alert("Please log in first!");
      return;
    }
  
    // ✅ Log email and quantity before sending the request
    console.log("🔹 Sending to cart:", { email, quantity });
  
    try {
      const response = await axios.post(
        `http://localhost:5001/api/products/${id}/add-to-cart`,
        {
          mail: email,  // Ensure your backend expects "mail" and not "email"
          quantity,
        }
      );
  
      console.log("✅ Cart Response:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("❌ Error adding to cart:", error.response?.data || error);
      alert("Error adding to cart. Please try again.");
    }
  };
  
  // ✅ Add to Wishlist
  const addToWishlist = async () => {
    if (!email) {
      alert("Please log in first!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5001/api/products/${id}/add-to-wishlist`, {
        mail: email
      });

      console.log("✅ Wishlist Response:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("❌ Error adding to wishlist:", error);
      alert("Error adding to wishlist. Please try again.");
    }
  };


  if (!product) {
    return <h2 className="loading">Loading Product...</h2>;
  }

  return (
    <section className="product-section">
      <div className="container-product">
        <div className="left">
          <Zoom smallImage={{src: `http://localhost:5001/${img}`, width: 500, height: 500 }} largeImage={{ src: `http://localhost:5001/${img}`, width: 1200, height: 1800 }} />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h3>Color: {product.color}</h3>
          <h3>Style: {product.style}</h3>
        </div>
        <div className="quantity-selector">
            <button onClick={decreaseQuantity}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={increaseQuantity}>+</button>
          </div>

          <div className="button-container">
            <button className="add-to-wishlist" onClick={addToWishlist}>ADD TO WISH LIST</button>
            <button className="add-to-cart" onClick={addToCart}>ADD TO CART</button>
          </div>
      </div>
    </section>
  );
}

export default Productf;