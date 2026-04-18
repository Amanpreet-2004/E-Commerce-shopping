

import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import { toast } from "react-toastify";

const API_BASE_URL = "https://e-commerce-shopping-cdqi.onrender.com";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://e-commerce-shopping-cdqi.onrender.com/order/allorders");
      if (response.data && response.data.success) {
        setOrders(response.data.data || []);
      }
    } catch (error) {
      toast.error("Orders load nahi ho pa rahe!");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (window.confirm("Are you to delete this order?")) {
      try {
        const response = await axios.delete(`https://e-commerce-shopping-cdqi.onrender.com/order/cancel/${orderId}`);
        if (response.data.success) {
          toast.success(response.data.message || "Order Cancelled!");
          fetchAllOrders(); 
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Cancel karne mein error aaya!";
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-danger"></div></div>;

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <div className="card shadow-lg border-0 p-4 mx-auto" style={{ borderRadius: "20px", maxWidth: "1200px" }}>
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>📦 Order Management</h3>
        
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "#b3d9e8" }}>
              <tr className="text-center">
                <th className="py-3 border-0" style={{ borderRadius: "15px 0 0 15px" }}>Customer</th>
                <th className="py-3 border-0">Products</th>
                <th className="py-3 border-0">Total</th>
                <th className="py-3 border-0">Payment</th>
                {/* <th className="py-3 border-0">Status</th> */}
                <th className="py-3 border-0" style={{ borderRadius: "0 15px 15px 0" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="text-center border-bottom">
                  <td className="py-4">
                    <div className="fw-bold">{order.name}</div>
                    <small className="text-muted">{order.email}</small>
                  </td>
                  <td className="py-3">
                    <div className="d-flex flex-column align-items-center gap-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="d-flex align-items-center p-2 bg-white shadow-sm border" style={{ borderRadius: "12px", width: "220px" }}>
                       
// Image tag in Orders.jsx
<img 
  src={
    item.image.startsWith('http') 
      ? item.image 
      : item.image.includes('localhost') 
        ? `${API_BASE_URL}/upload/images/${item.image.split('/').pop()}` 
        : `${API_BASE_URL}/${item.image.replace(/^\//, '')}`
  } 
  alt={item.name}
  onError={(e) => { e.target.src = "https://placehold.co/50x50?text=Product"; }}
  style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "8px" }}
/>
                          <div className="text-start">
                            <div className="fw-bold" style={{ fontSize: "0.8rem", color: "#444" }}>{item.name}</div>
                            <div className="text-muted small">Qty: {item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="fw-bold text-dark">${order.amount.toFixed(2)}</td>
                  
                  {/* Updated Payment Column */}
                  <td>
                    {order.payment === true || order.payment === "online" ? (
                      <span className="badge px-3 py-2" style={{ backgroundColor: "#e6ffed", color: "#22863a", border: "1px solid #22863a", borderRadius: "8px" }}>
                        Online Payment
                      </span>
                    ) : (
                      <span className="badge px-3 py-2" style={{ backgroundColor: "#fff", color: "#c76464", border: "1px solid #c76464", borderRadius: "8px" }}>
                        Offline (COD)
                      </span>
                    )}
                  </td>

                  {/* <td>
                    <select className="form-select form-select-sm border-0 shadow-sm mx-auto" style={{ width: "140px", borderRadius: "8px", backgroundColor: "#f8f9fa" }}>
                      <option>Order Placed</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </td> */}
                  <td>
                    <button 
                      onClick={() => cancelOrder(order._id)} 
                      className="btn btn-sm text-white fw-bold px-3 shadow-sm" 
                      style={{ backgroundColor: "#c76464", borderRadius: "8px" }}
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;