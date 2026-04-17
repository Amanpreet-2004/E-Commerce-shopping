


import CartSchema from "../model/cartSchema.js";

// export const addToCart = async (req, res) => {
//   try {
//     const { userId, productId, name, price, image, quantity } = req.body;

//     // Validation
//     if (!userId || !productId || !name || !price) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const newCartItem = new CartSchema({
//       userId,
//       productId,
//       name,
//       price,
//       image,
//       quantity: quantity || 1,
//     });

//     await newCartItem.save();
//     res.status(201).json({ success: true, message: "Product added to cart" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, name, price, image, quantity } = req.body;

        // Validation
        if (!userId || !productId || !name || !price) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // 🔹 PEHLE CHECK KARO: Kya ye product user ke cart mein pehle se hai?
        let cartItem = await CartSchema.findOne({ userId, productId });

        if (cartItem) {
            // AGAR HAI: Toh purani quantity ko naye se overwrite kar do
            cartItem.quantity = quantity;
            await cartItem.save();
            return res.status(200).json({ success: true, message: "Quantity updated in existing item" });
        } else {
            // AGAR NAHI HAI: Toh naya document banao
            const newCartItem = new CartSchema({
                userId,
                productId,
                name,
                price,
                image,
                quantity: quantity || 1,
            });
            await newCartItem.save();
            return res.status(201).json({ success: true, message: "Product added to cart" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await CartSchema.find({ userId });
    res.status(200).json({ success: true, body: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Console log lagayein taaki terminal mein dikhe ki call aa rahi hai
    console.log("Clearing cart for User:", userId);

    const result = await CartSchema.deleteMany({ userId: userId });
    
    res.json({ 
      success: true, 
      message: "Cart cleared successfully",
      deletedCount: result.deletedCount // Ye batayega kitne items delete huye
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// cartController.js
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        // Specific user aur product ka combination delete karein
        const result = await CartSchema.findOneAndDelete({ userId, productId });

        if (result) {
            res.status(200).json({ success: true, message: "Item removed" });
        } else {
            res.status(404).json({ success: false, message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};