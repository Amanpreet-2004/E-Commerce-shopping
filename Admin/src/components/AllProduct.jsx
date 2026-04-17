

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const API_BASE_URL = "https://e-commerce-shopping-cdqi.onrender.com";
const AllProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); 
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });

  const fetchInfo = async () => {
    try {
      const res = await fetch('https://e-commerce-shopping-cdqi.onrender.com/product/allproducts');
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    if (window.confirm("Are u want to delete this product?")) {
      try {
        const response = await fetch('https://e-commerce-shopping-cdqi.onrender.com/product/removeproduct', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id })
        });
        const data = await response.json();
        if (data.success) {
       toast.success("Product Deleted!");
          fetchInfo();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, price: product.price, image: product.image });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://e-commerce-shopping-cdqi.onrender.com/product/update/${editingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Product Updated Successfully!");
        setEditingProduct(null);
        fetchInfo();
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <div className="card shadow-lg border-0 p-4 mx-auto" style={{ borderRadius: "20px", maxWidth: "1000px" }}>
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>📦 All Products Inventory</h3>
        <div className="table-responsive">
          <table className="table table-hover align-middle text-center mb-0">
            <thead style={{ backgroundColor: "#b3d9e8" }}> 
              <tr>
                <th className="py-3 border-0" style={{ borderRadius: "15px 0 0 15px" }}>Product</th>
                <th className="py-3 border-0">Title</th>
                <th className="py-3 border-0">Price</th> 
                <th className="py-3 border-0" style={{ borderRadius: "0 15px 15px 0" }}>Action</th>
              </tr>
            </thead>
            <tbody className="border-0">
              {allproducts.length > 0 ? (
                allproducts.map((product, index) => (
                  <tr key={index} className="border-bottom">
                    <td className="py-3">
                      <img 
  src={
    product.image.startsWith('http') && !product.image.includes('localhost')
      ? product.image 
      : `${API_BASE_URL}/${product.image.replace('http://localhost:4644/', '')}`
  } 
  alt={product.name} 
  style={{ width: "50px", height: "50px", objectFit: "contain" }}
  onError={(e) => {
    e.target.src = "https://placehold.co/100x100?text=No+Image";
  }}
/>
                    </td>
                    <td className="fw-semibold">{product.name}</td>
                    <td className="fw-bold text-dark">${product.price}</td>
                    <td className="py-3">
                      <div className="d-flex justify-content-center gap-2">
                        <button 
                          onClick={() => openEditModal(product)} 
                          className="btn btn-sm px-3 fw-bold shadow-sm" 
                          style={{ backgroundColor: "#48d2ed", color: "white", borderRadius: "8px" }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => remove_product(product._id)} 
                          className="btn btn-sm px-3 fw-bold shadow-sm" 
                          style={{ backgroundColor: "#f06868", color: "white", borderRadius: "8px" }}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="py-5 text-muted">No products found. Start adding some!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingProduct && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "25px", backgroundColor: "#b3d9e8" }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Update Product Details</h5>
                <button type="button" className="btn-close" onClick={() => setEditingProduct(null)}></button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body text-start px-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Product Name</label>
                    <input type="text" className="form-control border-0 shadow-sm py-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ borderRadius: "10px" }} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Price ($)</label>
                    <input type="number" className="form-control border-0 shadow-sm py-2" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} style={{ borderRadius: "10px" }} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Image URL</label>
                    <input type="text" className="form-control border-0 shadow-sm py-2" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} style={{ borderRadius: "10px" }} required />
                  </div>
                </div>
                <div className="modal-footer border-0 justify-content-center pb-4">
                  <button type="button" className="btn btn-light px-4 fw-bold" style={{ borderRadius: "10px" }} onClick={() => setEditingProduct(null)}>Cancel</button>
                  <button type="submit" className="btn text-white px-4 fw-bold shadow-sm" style={{ backgroundColor: "#ed6969", borderRadius: "10px" }}>Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;