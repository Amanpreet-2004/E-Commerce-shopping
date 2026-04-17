import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProduct from './components/AddProduct';
import AllProduct from './components/AllProduct';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Users from './components/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role");

    // Agar URL mein token hai, toh use save karo
    if (token && role === "admin") {
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      
      // URL ko saaf karke Dashboard (/) par le jao
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <Router>
      <div className="d-flex">
        <Sidebar /> 
        <div className="w-100 bg-light">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/allProduct" element={<AllProduct />} />
              <Route path="/orders" element={<Orders />} />\
              <Route path="/users" element={<Users/>}/>
              <Route path="*" element={<div>404 - Not Found</div>} />
            </Routes>
              <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;