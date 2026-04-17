// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useNavigate, Link } from "react-router-dom";

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const userId = localStorage.getItem("userId");
// //   const navigate = useNavigate();

// //   // 1. Fetch Cart Items from Backend
// //   const fetchCart = async () => {
// //     if (!userId) {
// //       setLoading(false);
// //       return;
// //     }
// //     try {
// //       const res = await axios.get(`http://localhost:4644/cart/get/${userId}`);
// //       if (res.data.success) {
// //         setCartItems(res.data.body);
// //       }
// //     } catch (err) {
// //       console.error("Cart fetch error:", err);
// //       toast.error("Cart load nahi ho paya!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // 2. Remove Item from Cart
// //   const handleRemove = async (id) => {
// //     try {
// //       const res = await axios.delete(`http://localhost:4644/cart/clear/${userId}`);
// //       if (res.data.success) {
// //         toast.success("Item removed!");
// //         fetchCart(); // List refresh karein
// //       }
// //     } catch (err) {
// //       toast.error("Nahi nikal paye item!");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCart();
// //   }, [userId]);

// //   // Total Price Calculation
// //   const totalPrice = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

// //   if (loading) return (
// //     <div className="d-flex justify-content-center align-items-center vh-100">
// //       <div className="spinner-border text-danger" role="status"></div>
// //     </div>
// //   );

// //   return (
// //     <div className="container py-5" style={{ minHeight: "100vh", fontFamily: 'Poppins, sans-serif' }}>
// //       <h2 className="mb-5 fw-bold text-center mt-5">My Shopping Bag ({cartItems.length})</h2>
// // {/* 🔹 Beautiful Empty Cart Section */}
// // {cartItems.length === 0 ? (
// //   <div
// //     className="container d-flex justify-content-center align-items-center "
// //     style={{ minHeight: "60vh" }}
// //   >
// //     <div
// //       className="card border-0 shadow-lg p-5 text-center rounded-4"
// //       style={{
// //         maxWidth: "500px",
// //         background: "rgba(255, 255, 255, 0.8)",
// //         backdropFilter: "blur(10px)"
// //       }}
// //     >
// //       <div className="mb-4">
// //         {/* Cart Icon with Theme Color */}
// //         <i
// //           className="bi bi-cart-x"
// //           style={{ fontSize: "5rem", color: "#d9534f" }}
// //         ></i>
// //       </div>

// //       <h2 className="fw-bold mb-3" style={{ color: "#333" }}>
// //         Your Cart is Empty
// //       </h2>

// //       <p className="text-muted mb-4 fs-5">
// //         Looks like you haven't added anything to your bag yet. Let's find something special for you!
// //       </p>

// //       <Link
// //         to="/products"
// //         className="btn btn-lg px-5 py-3 rounded-pill shadow-sm border-0"
// //         style={{
// //           backgroundColor: "#d9534f",
// //           color: "white",
// //           fontWeight: "400",
// //           transition: "0.3s"
// //         }}
// //         onMouseOver={(e) => e.target.style.backgroundColor = "#e68a87"}
// //         onMouseOut={(e) => e.target.style.backgroundColor = "#d9534f"}
// //       >
// //         Start Shopping
// //       </Link>
// //     </div>
// //   </div>
// // ) : (
// //         <div className="row g-4">
// //           {/* Cart Items List */}
// //           <div className="col-lg-8">
// //             {cartItems.map((item) => (
// //               <div key={item._id} className="card border-0 shadow-sm mb-3 overflow-hidden rounded-4">
// //                 <div className="row g-0 align-items-center">
// //                   <div className="col-md-3">
// //                     <img
// //                       src={item.image}
// //                       className="img-fluid p-2 rounded-4"
// //                       alt={item.name}
// //                       style={{ height: "180px", width: "100%", objectFit: "cover" }}
// //                     />
// //                   </div>
// //                   <div className="col-md-6 p-3" style={{fontSize:"20px"}}>
// //                     <h3 className=" mb-1">{item.name}</h3>
// //                     <p className="text-danger mb-0 fw-semibold">${item.price}</p>
// //                     <small className="text-muted">Quantity: {item.quantity || 1}</small>
// //                   </div>

// //                   <div className="col-md-3 text-center overflow-visible" style={{ position: "relative", top: "-30px", marginLeft:"50px" }}>
// //           <button
// //             className="btn btn-outline-danger border-0 rounded-pill "
// //             onClick={() => handleRemove(item._id)}
// //           >

// //           Remove</button>
// //         </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Order Summary Sidebar */}
// //           <div className="col-lg-4">
// // <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: "100px", zIndex: "10" }}>
// //               <h4 className="fw-bold mb-4">Order Summary</h4>
// //               <div className="d-flex justify-content-between mb-2">
// //                 <span className="text-muted">Subtotal</span>
// //                 <span className="fw-bold">${totalPrice.toFixed(2)}</span>
// //               </div>
// //               <div className="d-flex justify-content-between mb-2">
// //                 <span className="text-muted">Delivery</span>
// //                 <span className="text-success fw-bold">FREE</span>
// //               </div>
// //               <hr />
// //               <div className="d-flex justify-content-between mb-4">
// //                 <span className="fs-5 fw-bold">Total</span>
// //                 <span className="fs-4 fw-bold text-danger">${totalPrice.toFixed(2)}</span>
// //               </div>
// //               <button
// //                 className="btn btn-danger py-3 rounded-pill fw-bold shadow"
// //                 onClick={() => navigate("/checkout")}
// //               >
// //                 Checkout Now
// //               </button>
// //               <div className="text-center mt-3">
// //                 <Link to="/products" className="text-muted text-decoration-none small">
// //                   ← Continue Shopping
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useNavigate, Link } from "react-router-dom";

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const userId = localStorage.getItem("userId");
// //   const navigate = useNavigate();

// //   const fetchCart = async () => {
// //     if (!userId) {
// //       setLoading(false);
// //       return;
// //     }
// //     try {
// //       const res = await axios.get(`http://localhost:4644/cart/get/${userId}`);
// //       if (res.data.success) {
// //         setCartItems(res.data.body);
// //       }
// //     } catch (err) {
// //       console.error("Cart fetch error:", err);
// //       toast.error("Cart load nahi ho paya!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // // --- NEW: Quantity Update Function ---
// //   // const updateQuantity = async (productId, newQuantity) => {
// //   //   if (newQuantity < 1) return; // 1 se kam nahi hone dena
// //   //   try {
// //   //     // Backend route check karein: /update-quantity ya /add (api endpoint ke according)
// //   //     const res = await axios.post(`http://localhost:4644/cart/add`, {
// //   //       userId,
// //   //       productId,
// //   //       quantity: newQuantity
// //   //     });

// //   //     if (res.data.success) {
// //   //       fetchCart(); // UI refresh
// //   //     }
// //   //   } catch (err) {
// //   //     toast.error("Quantity update nahi ho payi!");
// //   //   }
// //   // };

// //  const updateQuantity = async (item, newQty) => {
// //   if (newQty < 1) return;

// //   try {
// //     // Controller in fields ko 'required' maanta hai
// //     const requestBody = {
// //       userId: userId,
// //       productId: item.productId,
// //       name: item.name,   // Required field
// //       price: item.price, // Required field
// //       image: item.image, // Bhejna zaroori hai validation pass karne ke liye
// //       quantity: newQty
// //     };

// //     console.log("Sahi data bhej rahe hain:", requestBody);

// //     const res = await axios.post(`http://localhost:4644/cart/add`, requestBody);

// //     if (res.data.success) {
// //       fetchCart(); // Refresh list
// //       toast.success("Quantity updated!");
// //     }
// //   } catch (err) {
// //     console.error("Abhi bhi error hai:", err.response?.data);
// //     toast.error(err.response?.data?.message || "Update failed!");
// //   }
// // };

// //   const handleRemove = async (productId) => {
// //     try {
// //       // NOTE: remove ke liye alag delete api honi chahiye, clear nahi
// //       const res = await axios.delete(`http://localhost:4644/cart/remove/${userId}/${productId}`);
// //       if (res.data.success) {
// //         toast.success("Item removed!");
// //         fetchCart();
// //       }
// //     } catch (err) {
// //       toast.error("Nahi nikal paye item!");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCart();
// //   }, [userId]);

// //   const totalPrice = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

// //   if (loading) return (
// //     <div className="d-flex justify-content-center align-items-center vh-100">
// //       <div className="spinner-border text-danger" role="status"></div>
// //     </div>
// //   );

// //   return (
// //     <div className="container py-5" style={{ minHeight: "100vh", fontFamily: 'Poppins, sans-serif' }}>
// //       <h2 className="mb-5 fw-bold text-center mt-5">My Shopping Bag ({cartItems.length})</h2>

// //       {cartItems.length === 0 ? (
// //         <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
// //           {/* ... aapka existing empty cart UI ... */}
// //         </div>
// //       ) : (
// //         <div className="row g-4">
// //           <div className="col-lg-8">
// //             {cartItems.map((item) => (
// //               <div key={item._id} className="card border-0 shadow-sm mb-3 overflow-hidden rounded-4">
// //                 <div className="row g-0 align-items-center">
// //                   <div className="col-md-3">
// //                     <img src={item.image} className="img-fluid p-2 rounded-4" alt={item.name} style={{ height: "150px", width: "100%", objectFit: "cover" }} />
// //                   </div>
// //                   <div className="col-md-5 p-3">
// //                     <h4 className="mb-1">{item.name}</h4>
// //                     <p className="text-danger mb-2 fw-semibold">₹{item.price}</p>

// //                     {/* 🔹 Beautiful Quantity Controls */}
// //                     {/* <div className="d-flex align-items-center gap-3 mt-2">
// //                       <button
// //                         className="btn btn-sm btn-outline-secondary rounded-circle"
// //                         style={{ width: "32px", height: "32px" }}
// //                         onClick={() => updateQuantity(item.productId, item.quantity - 1)}
// //                       > - </button>

// //                       <span className="fw-bold fs-5">{item.quantity}</span>

// //                       <button
// //                         className="btn btn-sm btn-outline-danger rounded-circle"
// //                         style={{ width: "32px", height: "32px" }}
// //                         onClick={() => updateQuantity(item.productId, item.quantity + 1)}
// //                       > + </button>
// //                     </div> */}

// //                     <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
// // <span>{item.quantity}</span>
// // <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
// //                   </div>

// //                   <div className="col-md-4 text-center p-3">
// //                     <div className="fw-bold fs-5 mb-2">₹{(item.price * item.quantity).toFixed(2)}</div>
// //                     <button
// //                       className="btn btn-sm btn-link text-danger text-decoration-none"
// //                       onClick={() => handleRemove(item.productId)}
// //                     >
// //                       <i className="bi bi-trash me-1"></i> Remove
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="col-lg-4">
// //             {/* ... Summary Section (Price Calculation same rahega) ... */}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const fetchCart = async () => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const res = await axios.get(`http://localhost:4644/cart/get/${userId}`);
//       if (res.data.success) {
//         setCartItems(res.data.body);
//       }
//     } catch (err) {
//       console.error("Cart fetch error:", err);
//       toast.error("Cart load nahi ho paya!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 WORKING Quantity Update: Pura item object pass karna zaroori hai
//   // const updateQuantity = async (item, newQty) => {
//   //   if (newQty < 1) return;

//   //   try {
//   //     // Backend controller validation ke liye ye saare fields chahiye
//   //     const requestBody = {
//   //       userId: userId,
//   //       productId: item.productId, // Schema matches
//   //       name: item.name,           // Required by controller
//   //       price: item.price,         // Required by controller
//   //       image: item.image,
//   //       quantity: newQty
//   //     };

//   //     const res = await axios.post(`http://localhost:4644/cart/add`, requestBody);

//   //     if (res.data.success) {
//   //       fetchCart(); // UI refresh
//   //       toast.success("Quantity updated!");
//   //     }
//   //   } catch (err) {
//   //     console.error("Update Error:", err.response?.data);
//   //     toast.error(err.response?.data?.message || "Update failed!");
//   //   }
//   // };

//   const updateQuantity = async (item, newQty) => {
//   if (newQty < 1) return;

//   try {
//     const requestBody = {
//       userId: userId,
//       productId: item.productId, // Schema matches
//       name: item.name,
//       price: item.price,
//       image: item.image,
//       quantity: newQty // Naya count yahan se jayega
//     };

//     const res = await axios.post(`http://localhost:4644/cart/add`, requestBody);

//     if (res.data.success) {
//       fetchCart(); // Backend update hone ke baad fresh list mangwao
//     }
//   } catch (err) {
//     toast.error("Update fail!");
//   }
// };

//   // const handleRemove = async (productId) => {
//   //   try {
//   //     const res = await axios.delete(`http://localhost:4644/cart/remove/${userId}/${productId}`);
//   //     if (res.data.success) {
//   //       toast.success("Item removed!");
//   //       fetchCart();
//   //     }
//   //   } catch (err) {
//   //     toast.error("Nahi nikal paye item!");
//   //   }
//   // };

// // JSX mein button aise rakhein:
// <button
//   className="btn btn-sm btn-danger"
//   onClick={() => handleRemove(item.productId)}
// >
//   Remove
// </button>

//   useEffect(() => {
//     fetchCart();
//   }, [userId]);

//   const totalPrice = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

//   if (loading) return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <div className="spinner-border text-danger" role="status"></div>
//     </div>
//   );

//   return (
//     <div className="container py-5" style={{ minHeight: "100vh", fontFamily: 'Poppins, sans-serif' }}>
//       <h2 className="mb-5 fw-bold text-center mt-5">My Shopping Bag ({cartItems.length})</h2>

//       {cartItems.length === 0 ? (
//         <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
//            <div className="text-center">
//               <i className="bi bi-cart-x text-muted" style={{fontSize: "5rem"}}></i>
//               <h3>Your cart is empty</h3>
//               <Link to="/products" className="btn btn-danger mt-3">Start Shopping</Link>
//            </div>
//         </div>
//       ) : (
//         <div className="row g-4">
//           <div className="col-lg-8">
//             {cartItems.map((item) => (
//               <div key={item._id} className="card border-0 shadow-sm mb-3 overflow-hidden rounded-4">
//                 <div className="row g-0 align-items-center">
//                   <div className="col-md-3">
//                     <img src={item.image} className="img-fluid p-2 rounded-4" alt={item.name} style={{ height: "150px", width: "100%", objectFit: "cover" }} />
//                   </div>
//                   <div className="col-md-5 p-3">
//                     <h4 className="mb-1">{item.name}</h4>
//                     <p className="text-danger mb-2 fw-semibold">₹{item.price}</p>

//                     {/* 🔹 Quantity Controls with Item Object */}
//                     <div className="d-flex align-items-center gap-3 mt-3">
//                       <button
//                         className="btn btn-sm btn-outline-dark rounded-circle"
//                         style={{ width: "32px", height: "32px" }}
//                         onClick={() => updateQuantity(item, item.quantity - 1)}
//                       > - </button>

//                       <span className="fw-bold fs-5">{item.quantity}</span>

//                       <button
//                         className="btn btn-sm btn-outline-danger rounded-circle"
//                         style={{ width: "32px", height: "32px" }}
//                         onClick={() => updateQuantity(item, item.quantity + 1)}
//                       > + </button>
//                     </div>
//                   </div>

//                   <div className="col-md-4 text-center p-3">
//                     <div className="fw-bold fs-5 mb-2">₹{(item.price * item.quantity).toFixed(2)}</div>
//                     <button
//                       className="btn btn-sm btn-link text-danger text-decoration-none"
//                       onClick={() => handleRemove(item.productId)}
//                     >
//                       <i className="bi bi-trash me-1"></i> Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="col-lg-4">
//             <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: "100px" }}>
//               <h4 className="fw-bold mb-4">Order Summary</h4>
//               <div className="d-flex justify-content-between mb-2">
//                 <span className="text-muted">Subtotal</span>
//                 <span className="fw-bold">₹{totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="d-flex justify-content-between mb-2">
//                 <span className="text-muted">Delivery</span>
//                 <span className="text-success fw-bold">FREE</span>
//               </div>
//               <hr />
//               <div className="d-flex justify-content-between mb-4">
//                 <span className="fs-5 fw-bold">Total</span>
//                 <span className="fs-4 fw-bold text-danger">₹{totalPrice.toFixed(2)}</span>
//               </div>
//               <button
//                 className="btn btn-danger w-100 py-3 rounded-pill fw-bold shadow"
//                 onClick={() => navigate("/checkout")}
//               >
//                 Checkout Now
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

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
      const res = await axios.get(`http://localhost:4644/cart/get/${userId}`);
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
        `http://localhost:4644/cart/add`,
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
        `http://localhost:4644/cart/remove/${userId}/${pId}`,
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
            className="card border-0 shadow-lg p-5 text-center rounded-4"
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
              className="btnShop px-5 py-3 rounded-pill  border-0 "
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
                    <img
                      src={item.image}
                      className="img-fluid p-2 rounded-4"
                      alt={item.name}
                      style={{
                        height: "180px",
                        width: "100%",
                        objectFit: "cover",
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

                    <div className="d-flex align-items-center gap-0 gap-md-3">
                      <button
                        className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
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
                        {" "}
                        -{" "}
                      </button>

                      {/* Quantity Number */}
                      <span
                        className="fw-bold"
                        style={{
                          minWidth: "25px", // 👈 Number ke liye jagah fix kar di
                          textAlign: "center",
                          display: "inline-block",
                          fontSize: "1rem",
                        }}
                      >
                        {item.quantity}
                      </span>

                      {/* Plus Button */}
                      <button
                        className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "30px",
                          height: "30px",
                          flexShrink: 0, // 👈 Ye bhi zaroori hai
                          fontSize: "18px",
                          lineHeight: "1",
                        }}
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                      >
                        {" "}
                        +{" "}
                      </button>
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
                className="btnCheck btn-danger py-3 rounded-pill fw-bold shadow "
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
