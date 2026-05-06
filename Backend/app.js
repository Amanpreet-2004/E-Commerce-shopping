

// import 'dotenv/config';
// import express from 'express';
// import dbConnect from './connect/dbConnect.js';
// import userRouter from './routes/userRouter.js';
// import productRouter from "./routes/productRouter.js";
// import orderRouter from './routes/orderRouter.js';
// import cartRouter from "./routes/cartRouter.js";
// import cors from 'cors';
// import nodemailer from 'nodemailer';
// import multer from "multer";
// import path from "path";

// const app = express();

// // --- Middlewares ---
// app.use(express.json());
// // app.use(cors());
// // app.use(cors({
// //     origin: ["http://localhost:5174", "http://localhost:5174"], // Shop aur Admin dono ports
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true
// // }));

// // server.js mein cors ko aise update karein
// // app.use(cors({
// //     origin: ["http://localhost:5173", "http://localhost:5174"], 
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true
// // }));
// app.use(cors({
//     origin: [
//         "https://e-commerce-shopping-1-wfyu.onrender.com", // Aapka Frontend
//         "https://e-commerce-shopping-2-j2x1.onrender.com", // Aapka Admin Panel
//         "http://localhost:5173" // Local testing ke liye
//     ],
//      methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));
// app.use(express.urlencoded({ extended: true }));

// // const port = 4644;

// const PORT = process.env.PORT || 4644;

// // --- Database Connection ---
// dbConnect();

// // --- Static Folder ---
// app.use('/images', express.static('upload/images'));

// // --- Multer Setup ---
// const storage = multer.diskStorage({
//     destination: './upload/images', 
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// });
// const upload = multer({ storage: storage });

// // --- Image Upload Endpoint ---
// app.post("/upload", upload.single('product'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ success: 0, message: "No file uploaded" });
//     }
//     res.json({
//         success: 1,
//         image_url: `http://localhost:4644/images/${req.file.filename}`
//     });
// });

// // --- ✅ Updated Nodemailer Email Route ---
// app.post("/send-email", async (req, res) => {
//     const { name, email, address, payment } = req.body;

//     // 1. Transporter banayein
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'kaurcsamanpreet@gmail.com', // 👈 Yahan apna Gmail daalein
//             pass: 'jxps lmcs ugmu qtdo'      // 👈 Yahan apna 16-digit APP PASSWORD daalein
//         }
//     });

//     // 2. Email Details set karein
//     const mailOptions = {
//         from: 'kaurcsamanpreet@gmail.com',
//         to: email, // Customer ko mail jayegi
//         subject: `Order Confirmation - MyShop`,
//         html: `
//             <h3>Hello ${name},</h3>
//             <p>✨Your order has been placed successfully!🎉p>
//             <p><b>Delivery Address:</b> ${address}</p>
//             <p><b>Payment Mode:</b> ${payment}</p>
//             <br>
//             <p>Thank you for shopping with MyShop!</p>
//         `
//     };

//     // 3. Mail bhejein
//     try {
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ success: true, message: "Email sent successfully!" });
//     } catch (error) {
//         console.error("Nodemailer Error:", error);
//         res.status(500).json({ success: false, message: "Failed to send email" });
//     }
// });

// // --- Routes Registration ---
// app.use("/user", userRouter);
// app.use("/product", productRouter);
// app.use("/cart", cartRouter);
// app.use('/order', orderRouter);
// app.use('/uploads', express.static('uploads'));
// // Backend code mein ye line honi zaroori hai:
// app.use('/images', express.static('upload/images')); 
// // Ya phir jo bhi aapka folder name hai

// // --- Server Start ---
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// import 'dotenv/config';
// import express from 'express';
// import dbConnect from './connect/dbConnect.js';
// import userRouter from './routes/userRouter.js';
// import productRouter from "./routes/productRouter.js";
// import orderRouter from './routes/orderRouter.js';
// import cartRouter from "./routes/cartRouter.js";
// import cors from 'cors';
// import nodemailer from 'nodemailer';
// import multer from "multer";
// import path from "path";
// import fs from 'fs'; // Directory check ke liye

// const app = express();
// const PORT = process.env.PORT || 4644;

// // --- 1. Database Connection ---
// dbConnect();

// // --- 2. Middlewares ---
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS Update: Domain names check karlein
// app.use(cors({
//     origin: [
//         "https://e-commerce-shopping-1-wfyu.onrender.com", 
//         "https://e-commerce-shopping-2-j2x1.onrender.com", 
//         "http://localhost:5173"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

// // --- 3. Static Folders Fix ---
// // Ensure folder exists (Render par upload issue avoid karne ke liye)
// if (!fs.existsSync('./upload/images')){
//     fs.mkdirSync('./upload/images', { recursive: true });
// }
// app.use('/images', express.static('upload/images'));
// app.use('/uploads', express.static('uploads'));

// // --- 4. Multer Setup ---
// const storage = multer.diskStorage({
//     destination: './upload/images', 
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// });
// const upload = multer({ storage: storage });

// // --- 5. Image Upload Endpoint (FIXED) ---
// app.post("/upload", upload.single('product'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ success: 0, message: "No file uploaded" });
//     }
    
//     // Yahan localhost ki jagah dynamic URL use karein taaki Render par chale
//     const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    
//     res.json({
//         success: 1,
//         image_url: imageUrl
//     });
// });

// // --- 6. ✅ Nodemailer Email Route ---
// app.post("/send-email", async (req, res) => {
//     const { name, email, address, payment } = req.body;

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'kaurcsamanpreet@gmail.com', 
//             pass: 'jxps lmcs ugmu qtdo' 
//         }
//     });

//     const mailOptions = {
//         from: '"MyShop" <kaurcsamanpreet@gmail.com>',
//         to: email, 
//         subject: `Order Confirmation - MyShop`,
//         html: `
//             <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
//                 <h2 style="color: #e91e63;">Hello ${name},</h2>
//                 <p>✨ Your order has been placed successfully! 🎉</p>
//                 <p><b>Delivery Address:</b> ${address}</p>
//                 <p><b>Payment Mode:</b> ${payment}</p>
//                 <br>
//                 <p>Thank you for shopping with <b>MyShop</b>!</p>
//             </div>
//         `
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ success: true, message: "Email sent successfully!" });
//     } catch (error) {
//         console.error("Nodemailer Error:", error);
//         res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
//     }
// });

// // --- 7. Routes Registration ---
// app.use("/user", userRouter);
// app.use("/product", productRouter);
// app.use("/cart", cartRouter);
// app.use('/order', orderRouter);

// // Root route for testing
// app.get("/", (req, res) => {
//     res.send("Backend is Running!");
// });

// // --- 8. Server Start ---
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


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
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 4644;

// --- 1. Database Connection ---
dbConnect();

// --- 2. Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Update: Sabhi active domains add kar diye hain
app.use(cors({
    origin: [
        "https://e-commerce-shopping-1-wfyu.onrender.com", 
        "https://e-commerce-shopping-cdqi.onrender.com", // Aapka naya backend/frontend link
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// --- 3. Static Folders Fix ---
if (!fs.existsSync('./upload/images')){
    fs.mkdirSync('./upload/images', { recursive: true });
}
app.use('/images', express.static('upload/images'));
app.use('/uploads', express.static('uploads'));

// --- 4. Multer Setup ---
const storage = multer.diskStorage({
    destination: './upload/images', 
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    res.json({ success: 1, image_url: imageUrl });
});

// --- 6. ✅ FIXED Nodemailer Email Route ---
app.post("/send-email", async (req, res) => {
    const { name, email, address, payment } = req.body;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'kaurcsamanpreet@gmail.com', 
        pass: 'jxps lmcs ugmu qtdo' 
    },
    // ✅ Ye niche wali line IPv6 issue ko fix karegi
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    dnsTimeout: 10000,
    // Force IPv4 address
    tls: {
        rejectUnauthorized: false,
        servername: 'smtp.gmail.com'
    }
});

    const mailOptions = {
        from: '"MyShop" <kaurcsamanpreet@gmail.com>',
        to: email, 
        subject: `Order Confirmation - MyShop`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #e91e63;">Hello ${name},</h2>
                <p style="font-size: 16px;">✨ Your order has been placed successfully! 🎉</p>
                <hr style="border: 0; border-top: 1px solid #eee;" />
                <p><b>Delivery Address:</b> ${address}</p>
                <p><b>Payment Mode:</b> ${payment}</p>
                <br>
                <p>Thank you for shopping with <b style="color: #e91e63;">MyShop</b>!</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully to:", email);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        // Isse aapko Render Logs mein clear error dikhega
        console.error("❌ Nodemailer Error Detail:", error.message);
        res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
    }
});

// --- 7. Routes Registration ---
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use('/order', orderRouter);

app.get("/", (req, res) => {
    res.send("Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});