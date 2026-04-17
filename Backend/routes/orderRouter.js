import express from 'express';
import adminAuth  from '../middleware/adminAuth.js';
import { placeOrder,allOrder, cancelOrder, getDashboardStats, getRecentOrders} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Is route par frontend se request aayegi
orderRouter.post('/place', placeOrder);
orderRouter.get('/allorders', allOrder); 
orderRouter.delete('/cancel/:id', cancelOrder);
// orderRoute.js
orderRouter.get('/dashboard-stats', adminAuth, getDashboardStats);
orderRouter.get('/recent', adminAuth, getRecentOrders);
export default orderRouter;