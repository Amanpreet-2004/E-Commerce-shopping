

import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// 1. Live Backend URL - Iske peeche '/' mat lagana
const API_BASE_URL = "https://e-commerce-shopping-cdqi.onrender.com";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/product/allproducts`);
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Database se connect nahi ho pa raha!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.warn("login first!");
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
      
      if (response.status === 200 || response.status === 201) {
        toast.success(`${product.name} cart mein add ho gaya! 🛒`);
      }
    } catch (error) {
      toast.error("Cart update fail ho gaya.");
    }
  };

  return (
    <>
      <h1 className="pro-page text-center">Trending Products</h1>
      
      <div className="container2 mt-1 px-4">
        {loading ? (
          <div className="text-center py-5"><h3>Loading products...</h3></div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 text-center">
            {products.length === 0 ? (
              <div className="w-100 text-center py-5">
                <h3>Koi product nahi mila. Admin se sampark karein.</h3>
              </div>
            ) : (
              products.map((product) => (
                <div key={product._id || product.id} className="col">
                  <div className="product-card-inner pb-3">
            const API_BASE_URL = "https://e-commerce-shopping-cdqi.onrender.com";

// Map ke andar image tag aise likhein:
<img 
  src={
    item.image.startsWith('http') 
      ? item.image                                     // Agar pura URL hai (Cloudinary/S3)
      : item.image.includes('localhost')               // Agar purana localhost link hai
        ? `${API_BASE_URL}/upload/images/${item.image.split('/').pop()}` 
        : `${API_BASE_URL}/${item.image.replace(/^\//, '')}` // Live path fix
  } 
  alt={item.name}
  onError={(e) => { e.target.src = "https://placehold.co/50x50?text=Order"; }}
  style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "5px" }}
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
        )}
      </div>
    </>
  );
};

export default Product;