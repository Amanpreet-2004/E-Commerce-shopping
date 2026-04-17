

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4644/user/forgot-password", { email });
      
      if (res.data.status === 200) {
        toast.success("A password reset link has been sent to your email address!");
      } else {
        toast.error(res.data.message || "User not found!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 rounded card shadow-sm border-0" 
           style={{ backgroundColor: "#fff", borderRadius: "15px" }}>
        
        <div className="text-center mb-4">
          <h2 style={{ color: "#333", fontWeight: "600" }}>Forgot Password?</h2>
          <p className="text-muted" style={{ fontSize: "14px" }}>
          Please enter your registered email address, and we will send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label" style={{ fontSize: "14px", fontWeight: "500" }}>Email Address</label>
            <input
              type="email"
              className="form-control p-2"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "8px", border: "1px solid #ddd" }}
            />
          </div>

          <button 
            type="submit" 
            className="btn4 w-100 mb-3" 
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-3">
            <Link to="/login" style={{ textDecoration: "none", color: "#e57373", fontWeight: "500" }}>
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;