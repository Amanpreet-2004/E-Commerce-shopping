


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    newUsers: 0
  });
  const [recentUsers, setRecentUsers] = useState([]); // Nayi state users ke liye
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Dashboard Stats Fetch karein
      const resStats = await axios.get("https://e-commerce-shopping-cdqi.onrender.com/order/dashboard-stats", {
        headers: { token }
      });

      // Recent Users Fetch karein (aapka existing users route)
      const resUsers = await axios.get("https://e-commerce-shopping-cdqi.onrender.com/user/findUsers", {
        headers: { token }
      });

      if (resStats.data.success) {
        setStats(resStats.data.stats);
      }
      
      if (resUsers.data.success) {
        // Sirf top 5 users dikhane ke liye slice kiya
        setRecentUsers(resUsers.data.body.slice(0, 5)); 
      }

    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center mt-5"><h5>Loading Dashboard...</h5></div>;

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-bold" style={{ color: "#333" }}>Dashboard Overview</h2>
          <p className="text-muted">Welcome back, Admin! Here's what's happening with MyShop today.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">
        {[
          { label: "Total Products", value: stats.totalProducts },
          { label: "Total Orders", value: stats.totalOrders },
          { label: "Total Revenue", value: `₹${new Intl.NumberFormat('en-IN').format(stats.totalRevenue)}` },
          { label: "New Users", value: stats.newUsers }
        ].map((item, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card border-0 shadow-sm p-3" style={{ backgroundColor: "#b3d9e8", borderRadius: "20px" }}>
              <div className="card-body">
                <h6 className="text-muted text-uppercase small fw-bold">{item.label}</h6>
                <h3 className="fw-bold" style={{ color: "#c76464" }}>{item.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-2">
        {/* NEW: Recent Registered Users Table */}
        <div className="col-md-8 mb-4">
          <div className="card shadow-sm border-0 p-4 h-100 w-100" style={{ borderRadius: "20px", overflow:"hidden" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold m-0">Recently Registered Users</h5>
              <button onClick={() => navigate('/users')} className="btn btn-sm fw-bold" style={{ color: "#c76464" }}>View All</button>
            </div>
            
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="border-0 bg-transparent text-muted small">NAME</th>
                    <th className="border-0 bg-transparent text-muted small">EMAIL</th>
                    <th className="border-0 bg-transparent text-muted small">ROLE</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.length > 0 ? (
                    recentUsers.map((user, idx) => (
                      <tr key={idx}>
                        <td className="fw-bold" style={{ color: "#c76464" }}>{user.name}</td>
                        <td className="text-muted">{user.email}</td>
                        <td>
                          <span className="badge rounded-pill bg-dark px-3">{user.role || 'user'}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-muted">No new users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: "20px" }}>
            <h5 className="fw-bold mb-4">Quick Links</h5>
            <div className="d-grid gap-3">
              <button onClick={() => navigate('/allProduct')} className="btn fw-bold py-3 shadow-sm" style={{ backgroundColor: "#f25858", color: "white", borderRadius: "12px" }}>
                📦 Manage Inventory
              </button>
              <button onClick={() => navigate('/orders')} className="btn btn-outline-dark text-start py-3" style={{ borderRadius: "12px" }}>
                📜 View All Orders
              </button>
              <button onClick={() => navigate('/users')} className="btn btn-outline-dark text-start py-3" style={{ borderRadius: "12px" }}>
                👥 User Management
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;