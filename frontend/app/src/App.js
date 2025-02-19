import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import CataloguePage from "./pages/Catalogue";
import Cart from "./pages/cartf";
import Productf from "./pages/Productf";
import Homepage from "./pages/Homepage";
import Wishlist from "./pages/Wishlist";

import Contact from "./pages/Contact";
import BlogPage from "./pages/Blog";
import About from "./pages/About";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/catalogue" element={<CataloguePage />} />
      <Route path="/product/:id" element={<Productf />} /> {/* ✅ Ensure ID param */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      <Route path="/cart" element={<Cart />} /> 
      <Route path="/wishlist" element={<Wishlist />} /> 
      <Route path="/about" element={<About />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/catalogue" element={<CataloguePage />} />
    </Routes>
  );
}

export default App;