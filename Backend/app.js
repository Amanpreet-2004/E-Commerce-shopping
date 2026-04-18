

import 'dotenv/config';
import express from 'express';
import dbConnect from './connect/dbConnect.js';
import userRouter from './routes/userRouter.js';
import productRouter from "./routes/productRouter.js";
import orderRouter from './routes/orderRouter.js';
import cartRouter from "./routes/cartRouter.js";
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from "multer";
import path from "path";

const app = express();

// --- Middlewares ---
app.use(express.json());
// app.use(cors());
// app.use(cors({
//     origin: ["http://localhost:5174", "http://localhost:5174"], // Shop aur Admin dono ports
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

// server.js mein cors ko aise update karein
// app.use(cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"], 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));
app.use(cors({
    origin: [
        "https://e-commerce-shopping-1-wfyu.onrender.com", // Aapka Frontend
        "https://e-commerce-shopping-2-j2x1.onrender.com", // Aapka Admin Panel
        "http://localhost:5173" // Local testing ke liye
    ],
     methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

// const port = 4644;

const PORT = process.env.PORT || 4644;

// --- Database Connection ---
dbConnect();

// --- Static Folder ---
app.use('/images', express.static('upload/images'));

// --- Multer Setup ---
const storage = multer.diskStorage({
    destination: './upload/images', 
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage: storage });

// --- Image Upload Endpoint ---
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:4644/images/${req.file.filename}`
    });
});

// --- ✅ Updated Nodemailer Email Route ---
app.post("/send-email", async (req, res) => {
    const { name, email, address, payment } = req.body;

    // 1. Transporter banayein
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kaurcsamanpreet@gmail.com', // 👈 Yahan apna Gmail daalein
            pass: 'dixf zmkq cnbo xcsg'      // 👈 Yahan apna 16-digit APP PASSWORD daalein
        }
    });

    // 2. Email Details set karein
    const mailOptions = {
        from: 'kaurcsamanpreet@gmail.com',
        to: email, // Customer ko mail jayegi
        subject: `Order Confirmation - MyShop`,
        html: `
            <h3>Hello ${name},</h3>
            <p>✨Your order has been placed successfully!🎉p>
            <p><b>Delivery Address:</b> ${address}</p>
            <p><b>Payment Mode:</b> ${payment}</p>
            <br>
            <p>Thank you for shopping with MyShop!</p>
        `
    };

    // 3. Mail bhejein
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Nodemailer Error:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

// --- Routes Registration ---
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use('/order', orderRouter);
app.use('/uploads', express.static('uploads'));
// Backend code mein ye line honi zaroori hai:
app.use('/images', express.static('upload/images')); 
// Ya phir jo bhi aapka folder name hai

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});