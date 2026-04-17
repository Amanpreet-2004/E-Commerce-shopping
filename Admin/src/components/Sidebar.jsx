import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  return (
    <div className=" sidebar bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
      <h4 className="text-center mb-4 text-danger">MyShop Admin</h4>
      <hr />
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-white">Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/addProduct" className="nav-link text-white">Add Product</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/allProduct" className="nav-link text-white">Product List</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/orders" className="nav-link text-white">Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;