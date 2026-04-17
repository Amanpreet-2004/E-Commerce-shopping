

import express from 'express';
import { addToCart, getCartItems, clearCart,removeFromCart} from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/get/:userId", getCartItems);

cartRouter.delete("/remove/:userId/:productId", removeFromCart);
cartRouter.delete('/clear/:userId', clearCart);
export default cartRouter;