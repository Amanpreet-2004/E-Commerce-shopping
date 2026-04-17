import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: String, required: true },
    items: { type: Array, required: true }, // Cart items yahan aayenge
    amount: { type: Number, required: true },
    status: { type: String, default: "Order Placed" },
    date: { type: Number, default: Date.now() }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;