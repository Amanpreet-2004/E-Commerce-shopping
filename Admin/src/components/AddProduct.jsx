

// import React, { useState } from 'react';

// const AddProduct = () => {
//   const [image, setImage] = useState(false);
//   const [productDetails, setProductDetails] = useState({
//     name: "",
//     category: "women",
//    price:""
//   });

//   const imageHandler = (e) => {
//     setImage(e.target.files[0]);
//   }

//   const changeHandler = (e) => {
//     setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//   }

//   const Add_Product = async () => {
//     // Basic Validation: Check if image is selected
//     if(!image) {
//         alert("Please select an image first");
//         return;
//     }

//     let responseData;
//     let product = { ...productDetails }; // Create a fresh copy

//     let formData = new FormData();
//     formData.append('product', image);

//     try {
//       // 1. Uploading the image first
//       const uploadResp = await fetch('http://localhost:4644/upload', {
//         method: 'POST',
//         headers: { Accept: 'application/json' },
//         body: formData,
//       });
//       responseData = await uploadResp.json();

//       if (responseData.success) {
//         product.image = responseData.image_url;

//         // 2. Saving Product to Database
//         const addResp = await fetch('http://localhost:4644/product/add', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(product),
//         });
        
//         const finalData = await addResp.json();
        
//         if(finalData.success) {
//             alert("Product Added Successfully!");
//             // Form Reset karein
//             setProductDetails({
//                 name: "",
//                 category: "women",
//               price:""
//             });
//             setImage(false);
//         } else {
//             alert("Failed to add product");
//         }
//       } else {
//         alert("Image upload failed");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Server error, please check if backend is running");
//     }
//   }

//   return (
//     <div className="admin-card shadow-sm p-4">
//       <h3 className="mb-4 fw-bold">Add New Product</h3>
//       <div className="mb-3">
//         <label className="form-label fw-semibold">Product Title</label>
//         <input value={productDetails.name} onChange={changeHandler} type="text" name="name" className="form-control" placeholder="Type here" />
//       </div>
      
//       <div className="row">
//         <div className="col-md-6 mb-3">
//           <label className="form-label fw-semibold">Price</label>
//           <input value={productDetails.price} onChange={changeHandler} type="number" name="price" className="form-control" placeholder="$" />
//         </div>
        
//       </div>

      

      
//       <div className="mb-4 text-center">
//   {/* Label ki 'htmlFor' aur input ki 'id' match honi chahiye */}
//   <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
//     <img 
//       src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/120"} 
//       alt="Upload Preview" 
//       style={{ width: '120px', borderRadius: '10px', border: '1px solid #ddd' }} 
//     />
//     <p className="text-muted small mt-2">Click image to upload</p>
//   </label>

//   {/* Hidden Input Field */}
//   <input 
//     onChange={imageHandler} 
//     type="file" 
//     name="product" // Backend ke upload.single('product') se match karein
//     id="file-input" 
//     hidden 
//   />
// </div>

//       <button onClick={Add_Product} className="btn btn-danger py-2 w-100 fw-bold">ADD PRODUCT</button>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    price: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  const Add_Product = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    let responseData;
    let product = { ...productDetails };
    let formData = new FormData();
    formData.append('product', image);

    try {
      const uploadResp = await fetch('http://localhost:4644/upload', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      responseData = await uploadResp.json();

      if (responseData.success) {
        product.image = responseData.image_url;

        const addResp = await fetch('http://localhost:4644/product/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });

        const finalData = await addResp.json();

        if (finalData.success) {
          toast.success("added done")
          // alert("Product Added Successfully!");
          setProductDetails({ name: "", category: "women", price: "" });
          setImage(false);
        } else {
          alert("Failed to add product");
        }
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Server error, backend check karein");
    }
  }

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f4f7f6", minHeight: "90vh" }}>
      <div 
        className="card shadow-lg border-0 mx-auto" 
        style={{ 
          maxWidth: "600px", 
          borderRadius: "25px", 
          backgroundColor: "#b3d9e8", // Light Blue Contrast
          padding: "30px" 
        }}
      >
        <h3 className="mb-4 fw-bold text-center" style={{ color: "#333" }}>✨ Add New Product</h3>
        
        <div className="mb-3">
          <label className="form-label fw-bold ms-1">Product Title</label>
          <input 
            value={productDetails.name} 
            onChange={changeHandler} 
            type="text" 
            name="name" 
            className="form-control border-0 py-2 shadow-sm" 
            placeholder="e.g. Stylish Sneakers" 
            style={{ borderRadius: "10px" }}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold ms-1">Price ($)</label>
            <input 
              value={productDetails.price} 
              onChange={changeHandler} 
              type="number" 
              name="price" 
              className="form-control border-0 py-2 shadow-sm" 
              placeholder="0.00" 
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold ms-1">Category</label>
            <select 
              name="category" 
              value={productDetails.category} 
              onChange={changeHandler} 
              className="form-select border-0 py-2 shadow-sm"
              style={{ borderRadius: "10px", cursor: 'pointer' }}
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kid</option>
            </select>
          </div>
        </div>

        <div className="mb-4 text-center">
          <p className="fw-bold mb-2">Product Image</p>
          <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
            <div 
              style={{ 
                width: '150px', 
                height: '150px', 
                borderRadius: '20px', 
                border: '2px dashed #666', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#fff',
                overflow: 'hidden',
                margin: '0 auto',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "#c76464"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "#666"}
            >
              <img 
                src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/150?text=Click+to+Upload"} 
                alt="Upload Preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </label>
          <input onChange={imageHandler} type="file" name="product" id="file-input" hidden />
        </div>

        <button 
          onClick={Add_Product} 
          className="btn w-100 fw-bold text-white shadow"
          style={{ 
            backgroundColor: "#f56a6a", // Navbar Red
            borderRadius: "12px", 
            height: "55px",
            fontSize: "1.1rem",
            border: "none",
            transition: "0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#ea5353"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#f96161"}
        >
          CONFIRM & ADD PRODUCT
        </button>
      </div>
    </div>
  );
};

export default AddProduct;