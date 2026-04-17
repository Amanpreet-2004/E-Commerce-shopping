
import Order from "../model/orderSchema.js"; 
import productSchema from "../model/productSchema.js";
import userSchema from "../model/userSchema.js";

export const placeOrder = async (req, res) => {
    try {
      
        const newOrder = new Order({
            userId: req.body.userId,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            payment: req.body.payment,
            items: req.body.items,
            amount: req.body.amount,
        });

        await newOrder.save();
        
        // Success response
        res.status(201).json({ 
            success: true, 
            message: "Order Saved Successfully!" 
        });

    } catch (error) {
        console.error("Order Save Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error saving order",
            error: error.message 
        });
    }
};
// orderController.js
export const allOrder = async (req, res) => {
    try {
        // Aapke Order Model ka naam jo bhi ho (Order/orderModel)
        const orders = await Order.find({}); 
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};
// Cancel Order logic (Export style)
export const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id; // URL se ID fetch karne ke liye
        
        // Database se order find karke delete karein
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ 
                success: false, 
                message: "Order data not found!" 
            });
        }

        // Exact message jo aapke Postman test mein success dikha raha hai
        res.status(200).json({ 
            success: true, 
            message: "Order successfully cancelled and removed from MyShop database." 
        });

    } catch (error) {
        console.log("Error cancelling order:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error: Could not process cancellation." 
        });
    }
};





// export const getDashboardStats = async (req, res) => {
//     try {
//         // 1. Saara data parallel mein fetch karein (Performance ke liye)
//         const [productsCount, ordersCount, usersCount, allOrders] = await Promise.all([
//             productSchema.countDocuments(),
//             Order.countDocuments(),
//             userSchema.countDocuments({ role: 'user' }), // Sirf normal users
//             Order.find({})
//         ]);

//         // 2. Revenue calculate karein (Yahan check lagana zaroori hai)
//         const totalRevenue = allOrders.reduce((acc, order) => {
//             return acc + (Number(order.amount) || 0);
//         }, 0);

//         res.json({
//             success: true,
//             stats: {
//                 totalProducts: productsCount,
//                 totalOrders: ordersCount,
//                 totalRevenue: totalRevenue,
//                 newUsers: usersCount
//             }
//         });

//     } catch (error) {
//         console.log("Dashboard Stats Error:", error.message);
//         res.status(500).json({ 
//             success: false, 
//             message: "Database se data nikalne mein galti hui" 
//         });
//     }
// };





export const getDashboardStats = async (req, res) => {
    try {
        // Parallel queries to fetch real data
        const [pCount, oCount, uCount, allOrders] = await Promise.all([
            productSchema.countDocuments(),
            Order.countDocuments(),
            userSchema.countDocuments({ role: 'user' }), // Only count customers
        Order.find({})
        ]);

        // Calculate actual revenue from all orders
        const revenue = allOrders.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

        res.json({
            success: true,
            stats: {
                totalProducts: pCount,
                totalOrders: oCount,
                totalRevenue: revenue,
                newUsers: uCount
            }
        });
    } catch (error) {
        console.log("Stats Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getRecentOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 }).limit(5);
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};