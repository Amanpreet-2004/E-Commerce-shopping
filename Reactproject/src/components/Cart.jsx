
import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";



const API_BASE_URL = "https://e-commerce-shopping-cdqi.onrender.com";



const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // 1. Fetch Cart Items
  const fetchCart = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`https://e-commerce-shopping-cdqi.onrender.com/cart/get/${userId}`);
      if (res.data.success) {
        setCartItems(res.data.body);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
      toast.error("Cart load nahi ho paya!");
    } finally {
      setLoading(false);
    }
  };

  // 2. WORKING Quantity Update (With Old Design Compatibility)
  const updateQuantity = async (item, newQty) => {
    if (newQty < 1) return;
    try {
      const requestBody = {
        userId: userId,
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: newQty,
      };

      const res = await axios.post(
        `https://e-commerce-shopping-cdqi.onrender.com/cart/add`,
        requestBody,
      );
      if (res.data.success) {
        fetchCart(); // UI refresh
      }
    } catch (err) {
      toast.error("Quantity update nahi ho payi!");
    }
  };

  // 3. Remove Item from Cart (Specific Item Logic)
  const handleRemove = async (pId) => {
    try {
      const res = await axios.delete(
        `https://e-commerce-shopping-cdqi.onrender.com/cart/remove/${userId}/${pId}`,
      );
      if (res.data.success) {
        toast.success("Item removed!");
        fetchCart();
      }
    } catch (err) {
      toast.error("Nahi nikal paye item!");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );

  return (
    <div
      className="container py-5"
      style={{ minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}
    >
      <h2 className="mb-5 fw-bold text-center mt-5">
        My Shopping Bag ({cartItems.length})
      </h2>

      {/* 🔹 Beautiful Empty Cart Section (APKA PURANA DESIGN) */}
      {cartItems.length === 0 ? (
        <div
          className="container d-flex justify-content-center align-items-center "
          style={{ minHeight: "60vh" }}
        >
          <div
            className=" checkout-btn card border-0 shadow-lg p-5 text-center rounded-4"
            style={{
              maxWidth: "500px",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="mb-4">
              <i
                className="bi bi-cart-x"
                style={{ fontSize: "5rem", color: "#d9534f" }}
              ></i>
            </div>
            <h2 className="fw-bold mb-3" style={{ color: "#333" }}>
              Your Cart is Empty
            </h2>
            <p className="text-muted mb-4 fs-5">
              Looks like you haven't added anything to your bag yet.
            </p>
            <Link
              to="/products"
              className=" px-5 py-3 rounded-pill  border-0 "
              style={{
                backgroundColor: "#d9534f",
                color: "white",
                fontWeight: "400",
              }}
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="card border-0 shadow-sm mb-3 overflow-hidden rounded-4"
              >
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    {/* <img
                      src={item.image}
                      className="img-fluid p-2 rounded-4"
                      alt={item.name}
                      style={{
                        height: "180px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    /> */}
<img 
  src={
    item.image.includes("localhost") 
      ? `https://e-commerce-shopping-cdqi.onrender.com/images/${item.image.split('/').pop()}` 
      : item.image.startsWith('http') 
        ? item.image 
        : `https://e-commerce-shopping-cdqi.onrender.com/${item.image}`
  } 
  alt={item.name} 
  className="cart-item-image"
  onError={(e) => {
    e.target.src = "https://placehold.co/100x100?text=Reload+Image";
  }}
/>
                    
                  </div>
                  <div
                    className=" col-8 col-md-6 p-3"
                    style={{ fontSize: "20px" }}
                  >
                    <h3 className="mb-1">{item.name}</h3>
                    <p className="text-danger mb-2 fw-semibold">
                      ${item.price}
                    </p>

                  
                      {/* <button
                        className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center btn-plus-minus"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginLeft: "20px",
                          flexShrink: 0, // 👈 Ye button ko pichakne se rokega
                          fontSize: "18px",
                          lineHeight: "1",
                        }}
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                      >
                        
                        -
                      </button> */}

                      {/* Quantity Number */}
                      {/* <span
                        className="fw-bold"
                        style={{
                          minWidth: "25px", // 👈 Number ke liye jagah fix kar di
                          textAlign: "center",
                          display: "inline-block",
                          fontSize: "1rem",
                        }}
                      >
                        {item.quantity}
                      </span> */}

                      {/* Plus Button
                      <button
                        className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center btn-plus-minus"
                        style={{
                          width: "30px",
                          height: "30px",
                          flexShrink: 0, // 👈 Ye bhi zaroori hai
                          fontSize: "18px",
                          lineHeight: "1",
                        }}
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                      >
                       
                        +
                      </button> */}

                      <div className="quantity-controls">
  <button className="btn-minus"  onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
  <span>{item.quantity}</span>
  <button className="btn-plus"  onClick={() => updateQuantity(item, item.quantity + 1)}>+</button> {/* Yahan '+' hona zaroori hai */}
</div>
                   
                    
                  </div>

                  <div
                    className="col-md-3 text-center"
                    style={{ position: "relative", top: "0px" }}
                  >
                    <button
                      className="btn rounded-pill"
                      onClick={() => handleRemove(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm rounded-4 p-4 sticky-top"
              style={{ top: "100px", zIndex: "10" }}
            >
              <h4 className="fw-bold mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Delivery</span>
                <span className="text-success fw-bold">FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-5 fw-bold">Total</span>
                <span className="fs-4 fw-bold text-danger">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                className="checkout-btn btn-danger py-3 rounded-pill fw-bold shadow "
                onClick={() => navigate("/checkout")}
              >
                Checkout Now
              </button>
              <div className="text-center mt-3">
                <Link
                  to="/products"
                  className="text-muted text-decoration-none small"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
