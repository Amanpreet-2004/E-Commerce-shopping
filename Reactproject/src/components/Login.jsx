


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Backend API call
      const res = await axios.post("http://localhost:4644/user/login", data);

      // 2. Success check
      if (res.data.success) {
        const userData = res.data.body;
        const token = res.data.token;

        // CRITICAL FIX: MongoDB uses '_id'. Checking both for safety.
        if (userData && (userData._id || userData.id)) {
          const userId = userData._id || userData.id;

          // 3. Save data to LocalStorage
          localStorage.clear();
          localStorage.setItem("token", token);
          localStorage.setItem("userRole", userData.role); // 'admin' ya 'user'
          localStorage.setItem("userId", userId);
          localStorage.setItem("currentUser", JSON.stringify(userData));
          localStorage.setItem("loggedIn", "true");

          toast.success("Login Successful!");
// Login.jsx mein redirection wala part

          // 4. Role-based Redirection with Port Switch
          setTimeout(() => {
//            if (userData.role === "admin") {
//     // Port 5174 ke storage mein data dalne ke liye hum URL parameters use kar sakte hain
//     // const adminUrl = `http://localhost:5174/addProduct?token=${token}&role=${userData.role}`;
//     // window.location.replace(adminUrl); 
// } 
// if (userData.role === "admin") {
//     // Sirf itna likhein, token URL mein mat bhejein agar aapko rasta saaf chahiye
//     window.location.replace("http://localhost:5174/"); 
//     window.history.replaceState({}, document.title, "/");
// }
// if (userData.role === "admin") {
//     toast.success("Redirecting to Admin Panel...");
//     setTimeout(() => {
//         // Sirf ye ek line kaafi hai
//         window.location.href = "http://localhost:5173/"; 
//     }, 500);
// }
if (userData.role === "admin") {
    // Port 5174 par bhej rahe hain token ke saath
    const adminUrl = `http://localhost:5173/?token=${token}&role=${userData.role}`;
    window.location.href = adminUrl;
}
else {
              // Normal user isi project ke products page par jaye
              navigate("/products");
            }
          }, 1000);
        } else {
          toast.error("User data not found in response");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      const errorMsg = error.response?.data?.message || "Invalid Credentials or Server Error";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 rounded card shadow-sm" style={{ backgroundColor: "#cfe2f3" }}>
        <h2 className="text-center mb-4" style={{ fontFamily: "serif", fontWeight: "bold" }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              placeholder="Email" 
              value={data.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              placeholder="Password" 
              value={data.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit" className="btn4 w-75 d-block mx-auto">Login</button>

          {/* <div className="text-center mt-3">
            Forgot password? <Link to="/forgot-password">Click here</Link>
          </div> */}

          <hr />

          <p className="text-center mt-2">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;