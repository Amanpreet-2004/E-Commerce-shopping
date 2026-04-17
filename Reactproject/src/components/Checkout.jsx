
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    payment: "",
  });

  // State ko empty array se start karein taaki .length error na aaye
  const [cartData, setCartData] = useState({ items: [], totalAmount: 0 });
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // 1. Cart Data load karein (Ye zaroori hai warna order place nahi hoga)
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:4644/cart/get/${userId}`);
        if (response.data && response.data.success) {
          // Aapka data 'body' mein aa raha hai
          const itemsArray = response.data.body || [];
          const total = itemsArray.reduce((acc, item) => acc + (item.price * item.quantity), 0);
          
          setCartData({
            items: itemsArray,
            totalAmount: total 
          });
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };
    fetchCart();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Safety Check: Agar cart empty hai toh request mat bhejo
    if (!cartData.items || cartData.items.length === 0) {
      toast.error("Aapka cart khali hai! Pehle products add karein.");
      return;
    }

    const orderPayload = {
      userId: userId,
      ...formData,
      items: cartData.items,
      amount: cartData.totalAmount
    };

    try {
  // 1. Database mein Order save karein (Taki Admin ko dikhe)
  const response = await axios.post("http://localhost:4644/order/place", orderPayload);

  if (response.data.success) {
    const userId = localStorage.getItem("userId");

    // 2. IMPORTANT: Order success hone par Cart empty karein
    try {
      await axios.delete(`http://localhost:4644/cart/clear/${userId}`);
      
      // Navbar badge ko instant 0 karne ke liye event dispatch karein
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (cartErr) {
      console.error("Cart clear nahi ho paya:", cartErr);
    }

    toast.success("✅ Order Saved & Cart Cleared!");

    // 3. Email bhejne ki koshish karein
    try {
      await axios.post("http://localhost:4644/send-email", formData);
      toast.success("Confirmation mail sent!");
    } catch (emailErr) {
      console.warn("Mail nahi gayi, par order aur cart clean-up ho gaya.");
    }

    // Redirect to Success Page
    setTimeout(() => {
      navigate("/orderDone");
    }, 2000);
  }
} catch (err) {
  console.error("Order Error:", err);
  toast.error("Order place karne mein technical error aaya.");
}
  
   };

  return (
    <div className="container7 text-center ">
      <h2 className="mb-4">Checkout</h2>
      


      <form onSubmit={handleSubmit} className="mx-auto p-4 card rounded shadow-sm" style={{ maxWidth: "450px", border: "1px solid #ddd" }}>
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Full Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Email Address</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Delivery Address</label>
          <textarea className="form-control" rows="3" name="address" value={formData.address} onChange={handleChange} required></textarea>
        </div>

        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Payment mode</label>
          <select className="form-control" name="payment" value={formData.payment} onChange={handleChange} required>
            <option value="" disabled>Select Payment Method ⬇️</option>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </div>

        {/* Button tabhi enable hoga jab server chalu hoga */}
        <button type="submit" className="btn4 w-75 d-block mx-auto mt-3">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;