import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css"; // Use same styling as cart

const Wishlist = () => {
  // const email = '123@gmail.com'
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});

    // Retrieve email from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user ? user.email : null;

    useEffect(() => {
        if (email) {
            fetchWishlist();
        }
    }, [email]);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/wishlist/${email}`);
            setWishlistItems(response.data.wishlist || []);

            // Initialize quantities for each item
            const initialQuantities = {};
            response.data.wishlist.forEach(item => {
                initialQuantities[item.productId] = item.quantity;
            });
            setQuantities(initialQuantities);
        } catch (error) {
            console.error("❌ Error fetching wishlist:", error);
        } finally {
            setLoading(false);
        }
    };  
    const moveAllToCart = async () => {
      try {
          await axios.post(`http://localhost:5001/api/wishlist/${email}/move-all-to-cart`, {
              quantity: 1, // Default quantity
          });
          fetchWishlist();
      } catch (error) {
          console.error("❌ Error moving all items to cart:", error);
      }
  };

    const moveToCart = async (productId) => {
        try {
            await axios.post(`http://localhost:5001/api/wishlist/${email}/move-to-cart/${productId}`, {
                quantity: quantities[productId], // Send the selected quantity
            });

            fetchWishlist(); // Refresh UI
        } catch (error) {
            console.error("❌ Error moving item to cart:", error);
        }
    };

    const deleteItem = async (productId) => {
        try {
            await axios.delete(`http://localhost:5001/api/wishlist/${email}/remove/${productId}`);
            fetchWishlist();
        } catch (error) {
            console.error("❌ Error deleting item:", error);
        }
    };

    return (
        <div className="cart-container">
            <h1>Your Wishlist</h1>
            {loading ? <p>Loading...</p> : (
                wishlistItems.length === 0 ? <p>Wishlist is empty</p> :
                wishlistItems.map(item => (
                    <div key={item._id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <button className="add-button" onClick={() => moveToCart(item.productId)}>Add to Cart</button>
                            <button className="remove-button" onClick={() => deleteItem(item.productId)}>Remove</button>
                        </div>
                    </div>
                ))
            )}
            {wishlistItems.length > 0 && (
                <div className="proceed-to-buy">
                    <button onClick={moveAllToCart} className="proceed-button">Add All to Cart</button>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
