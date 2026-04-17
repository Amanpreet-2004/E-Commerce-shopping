
import Product from "../model/productSchema.js";


export const addProduct = async (req, res) => {
    try {
        console.log("Data Received:", req.body); // Debugging ke liye terminal mein dekhein

        // Schema ke mutabiq fields nikaalein
        const { name, price, category, image, description } = req.body;

        // Validation check
        if (!name || !category || !image) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const product = new Product({
            name,
            price, // Aapke schema mein price hai
            category,
            image,
            description
        });

        await product.save();
        res.status(201).json({ success: true, message: "Product Added Successfully!", product });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({}); // MongoDB se saare products fetch karein
        console.log("Products fetched successfully");
        res.status(200).json(products);
    } catch (error) {
        console.log("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const removeProduct = async (req, res) => {
  try {
    // FIX: req.params.id ki jagah req.body.id use karein
    const { id } = req.body; 

    // Debugging ke liye terminal mein check karein
    console.log("Deleting product with ID:", id);

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        status: 404,
        message: "Product not found in database",
      });
    }

    console.log("Product deleted successfully:", deletedProduct);

    res.json({
      status: 200,
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      status: 500,
      message: "Error deleting product",
    });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    console.log("Product updated successfully:", updatedProduct);

    res.json({
      status: 200,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      status: 500,
      message: "Error updating product",
    });
  }
};

// ✅ Get Cart Items by User ID (Naya Function)
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params; // URL se userId uthayenge
    
    // Database mein wahi items find karein jinka userId match karta ho
    const items = await Product.find({ userId: userId });

    console.log(`Fetched ${items.length} cart items for user: ${userId}`);

    res.json({
      status: 200,
      products: items,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({
      status: 500,
      message: "Error fetching cart items",
    });
  }
};

// ✅ Remove Item From Cart (Naya Function)
export const removeFromCart = async (req, res) => {
  try {
    // req.params.id ka matlab hai product ki unique _id
    const deletedItem = await product.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

    res.json({
      status: 200,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error removing item" });
  }
};