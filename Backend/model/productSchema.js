import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required:false },
    category: { type: String, required: true },
    image: { type: String, required: true }, // Image URL ke liye
    description: { type: String }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);