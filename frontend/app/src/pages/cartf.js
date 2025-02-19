import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import "./cart.css";

const Cart = () => {
    // const email = "123@gmail.com";
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // // Retrieve email from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user ? user.email : null;

    useEffect(() => {
        if (email) {
            fetchCart();
        }
    }, [email]);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/cart/${email}`);
            console.log("📦 Cart Data from API:", response.data);
            setCartItems(response.data.cart || []);
        } catch (error) {
            console.error("❌ Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const response = await axios.put(`http://localhost:5001/api/cart/${email}/update`, {
                productId,
                quantity: newQuantity
            });
            setCartItems(response.data.updatedCart);
        } catch (error) {
            console.error("❌ Error updating quantity:", error.response?.data || error.message);
        }
    };

    const deleteItem = async (productId) => {
        try {
            await axios.delete(`http://localhost:5001/api/cart/${email}/remove/${productId}`);
            fetchCart();
        } catch (error) {
            console.error("❌ Error deleting item:", error.response?.data || error.message);
        }
    };

    const proceedToPay = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/orders/create', {
                mail: email, 
                cartItems
            });
    
            console.log("✅ Order placed successfully:", response.data);
    
            Swal.fire({
                title: 'Success!',
                text: 'Order placed successfully!',
                icon: 'success'
            }).then(() => {
                // ✅ Clear cart in frontend after order is placed
                setCartItems([]); 
            });
    
        } catch (error) {
            console.error("❌ Error placing order:", error.response?.data || error.message);
            alert("Error placing order. Please try again.");
        }
    };
    

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {loading ? <p>Loading...</p> : (
                cartItems.length === 0 ? <p>Cart is empty</p> :
                cartItems.map(item => (
                    <div key={item._id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <div className="quantity-controls">
                                <p>Quantity:</p>
                                <button className="quantity" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="quantity" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                                <button className="remove-button" onClick={() => deleteItem(item.productId)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && (
                <div className="proceed-to-buy">
                    <button onClick={proceedToPay} className="proceed-button">
                        Proceed to Pay
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
