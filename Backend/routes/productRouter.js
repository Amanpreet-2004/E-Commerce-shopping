

import express from "express";
import {
  addProduct,
  getAllProducts,
removeProduct,
  updateProduct,
  getCartItems,     // Add this
  removeFromCart,
} from "../controllers/productController.js";

const router = express.Router();

// Yahan sirf '/' se start karein aur 'product' word hata dein
router.post("/add", addProduct);          // Final URL: /product/add
router.get("/allproducts", getAllProducts);          // Final URL: /product/all
router.delete("/removeproduct", removeProduct); // Final URL: /product/delete/:id
router.put("/update/:id", updateProduct);
router.get("/cart/:userId", getCartItems);       // Final URL: /product/cart/YOUR_ID
router.delete("/cart/remove/:id", removeFromCart);    // Final URL: /product/update/:id

export default router;