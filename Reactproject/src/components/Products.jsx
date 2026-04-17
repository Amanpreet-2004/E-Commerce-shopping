

// import React, { useState, useEffect } from "react"; // 1. useState aur useEffect add kiya
// import "../App.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify"; 

// const Product = () => {
//   const navigate = useNavigate();
  
//   // 2. Hardcoded products hatakar state banayi
//   const [products, setProducts] = useState([]);

//   // 3. Backend se fresh data laane ke liye function
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("https://e-commerce-shopping-cdqi.onrender.com/product/allproducts");
//       // Agar backend se array mil raha hai toh hi set karein
//       if (response.data) {
//         setProducts(response.data); 
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // 4. Page load hote hi data fetch karein
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleAddToCart = async (product) => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       toast.warn("Please login first to add products!");
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await axios.post("https://e-commerce-shopping-cdqi.onrender.com/cart/add", {
//         userId: userId,
//         productId: String(product._id || product.id), // MongoDB use kar rahe ho toh _id hoga
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: 1
//       });
      
//       if (response.data.success || response.status === 201) {
//         toast.success(`${product.name} added to cart! 🛒`);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add product!");
//     }
//   };

//   return (
//     <>
//       <h1 className="pro-page text-center ">Trending Products</h1>
      
//       <div className="container2 mt-1 px-4">
//         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 text-center">
//           {/* 5. Agar products empty hain toh message dikhayein */}
//           {products.length === 0 ? (
//             <div className="w-100 text-center py-5">
//               <h3>No products found! Say Admin to add Products.</h3>
//             </div>
//           ) : (
//             products.map((product) => (
//               <div key={product._id || product.id} className="col">
//                 <div className="product-card-inner pb-3">
//                   <img src={product.image} alt={product.name} className="imgpro shadow-sm" />
//                   <h5 className="mt-3 fw-bold">{product.name}</h5>
//                   <h6 className="textf">Price: ${product.price}</h6>
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/128/11906/11906637.png"
//                     className="iconpro"
//                     alt="rating"
//                   />
//                   <br />
//                   <button className="btn1 mt-2" onClick={() => handleAddToCart(product)}>
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Product;

import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// 1. Live Backend ka URL yahan define kiya
const API_BASE_URL = "https://e-commerce-shopping-cdqi.onrender.com";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      // Backend se products lane ka link
      const response = await axios.get(`${API_BASE_URL}/product/allproducts`);
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.warn("Please login first to add products!");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/cart/add`, {
        userId: userId,
        productId: String(product._id || product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
      
      if (response.data.success || response.status === 201) {
        toast.success(`${product.name} added to cart! 🛒`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product!");
    }
  };

  return (
    <>
      <h1 className="pro-page text-center ">Trending Products</h1>
      
      <div className="container2 mt-1 px-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 text-center">
          {products.length === 0 ? (
            <div className="w-100 text-center py-5">
              <h3>No products found! Say Admin to add Products.</h3>
            </div>
          ) : (
            products.map((product) => (
              <div key={product._id || product.id} className="col">
                <div className="product-card-inner pb-3">
                  
                  {/* YAHAN IMAGE FIX KI HAI: Base URL + image path */}
                  <img 
                    src={`${API_BASE_URL}/${product.image}`} 
                    alt={product.name} 
                    className="imgpro shadow-sm" 
                    onError={(e) => {
                      // Agar image load na ho toh placeholder dikhaye
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />

                  <h5 className="mt-3 fw-bold">{product.name}</h5>
                  <h6 className="textf">Price: ${product.price}</h6>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/11906/11906637.png"
                    className="iconpro"
                    alt="rating"
                  />
                  <br />
                  <button className="btn1 mt-2" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Product;