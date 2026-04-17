

import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

const fetchCartCount = useCallback(async () => {
  const userId = localStorage.getItem("userId");

  // Agar userId nahi hai (Logout ke baad), toh API call mat karein sidha 0 karein
  if (!userId || userId === "null" || userId === "undefined") {
    setCartCount(0);
    return;
  }

  try {
    const res = await axios.get(`https://e-commerce-shopping-cdqi.onrender.com/cart/get/${userId}`);
    if (res.data.success) {
      // Check karein ki response mein data hai ya body
      const items = res.data.data || res.data.body || [];
      setCartCount(items.length);
    }
  } catch (error) {
    setCartCount(0);
  }
}, []);
  
  useEffect(() => {
    // Initial fetch
    fetchCartCount();

    // 1. Interval for polling (Back-up)
    const interval = setInterval(fetchCartCount, 3000);

    // 2. Custom Event Listener (Instant update bina refresh ke)
    // Jab bhi aap Cart page se item delete karein, wahan 'cartUpdated' dispatch karein
    window.addEventListener("cartUpdated", fetchCartCount);

    return () => {
      clearInterval(interval);
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, [fetchCartCount]);

  // const handleLogout = () => {
  //   localStorage.clear();
  //   alert("You have been logged out.");
  //   navigate("/");
  //   window.location.reload();
  // };
  
const handleLogout = () => {
  // 1. Storage saaf karein
  localStorage.clear();
  
  // 2. State ko manually 0 karein taaki UI turant update ho
  setCartCount(0);
  
  // 3. Navigate ki jagah replace use karein taaki state fresh ho jaye
  window.location.replace("/login"); 
};
  return (
    <div className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <h2>MyShop</h2>

        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 me-3 mb-lg-0 fs-5 text">
            
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/signup">Contact</Link>
            </li>

            <li className="nav-item">
              <Link className="cart nav-link" to="/cart">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png"
                  className="cart-icon"
                  alt="cart"
                />
                <sup className="cart-badge">{cartCount}</sup>
              </Link>
            </li>

            <button className="btn5" onClick={handleLogout}>
              Logout
            </button>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;