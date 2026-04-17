import React from "react";
import { Link } from "react-router-dom";

const OrderDone = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "100vh" }}>
      <img 
        src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
        alt="thank-you"
        style={{ width: "100px", marginBottom: "-60px" }}
      />
      <h1> 🎉Thank You for Shopping with Us!🎉 </h1>
      <p>Your order has been placed successfully.✅ </p>
      <Link to="/">
        <button className="btn6">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default OrderDone;
