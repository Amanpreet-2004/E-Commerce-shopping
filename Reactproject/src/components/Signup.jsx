

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  // 1. State mein default role 'user' rakha hai
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" 
  });

  // Handle input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4644/user/signup",
        data
      );

      if (res.status === 201 || res.status === 200) {
        toast.success(res.data.message || "Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      console.log("Signup Error details:", error.response?.data);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center mt-5">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div
            className="card shadow border-0 p-4"
            style={{
              borderRadius: "20px",
              backgroundColor: "#b3d9e8", 
              overflow: "visible",
            }}
          >
            <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#333" }}>
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-2 text-start">
                <label className="form-label small fw-bold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="form-control border-0 py-2 shadow-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-2 text-start">
                <label className="form-label small fw-bold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="form-control border-0 py-2 shadow-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-2 text-start">
                <label className="form-label small fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="form-control border-0 py-2 shadow-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* 2. FIXED: yahan handleChange use kiya hai (changeHandler ki jagah) */}
              <div className="mb-4 text-start">
                <label className="form-label small fw-bold">Select Role</label>
                <select 
                  name="role" 
                  value={data.role}
                  onChange={handleChange} 
                  className="form-select border-0 py-2 shadow-sm"
                  style={{ borderRadius: "10px", cursor: "pointer" }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn mb-4 text-white fw-bold shadow-sm" 
                style={{ 
                  borderRadius: "10px", 
                  height: "50px", 
                  backgroundColor: "#f56a6a", // Reddish theme match
                  border: "none"
                }}
              >
                Sign Up
              </button>
            </form>

            <p className="text-center mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
              Already have an account?{" "}
              <a href="/login" className="text-danger fw-bold text-decoration-none">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;