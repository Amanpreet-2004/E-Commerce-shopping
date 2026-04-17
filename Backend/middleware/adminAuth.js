import jwt from 'jsonwebtoken';
import 'dotenv/config'; // Yeh line ensure karegi ki secret key load ho jaye

const adminAuth = async (req, res, next) => {
    try {
        // 1. Headers se token nikalna
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        // 2. Secret key check (Debugging ke liye)
        if (!process.env.JWT_SECRET) {
            console.error("ERROR: JWT_SECRET is not defined in .env file");
            return res.json({ success: false, message: "Server Configuration Error" });
        }

        // 3. Token verify karna
        // verify() tabhi chalta hai jab secret key valid string ho
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Admin Role Validation
        // Make sure login ke waqt payload mein 'role' bheja tha
        if (token_decode.role !== 'admin') {
            return res.json({ success: false, message: "Not Authorized: Admin access required" });
        }

        next(); 
    } catch (error) {
        console.log("JWT Error:", error.message);
        // Agar token galat hai ya expired hai toh ye block chalega
        res.json({ success: false, message: "Session Expired or Invalid Token, Login Again" });
    }
}

export default adminAuth;