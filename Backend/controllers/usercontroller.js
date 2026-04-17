

import userDataSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// --- Secret Key (Ise .env file mein hona chahiye) ---
const JWT_SECRET = "my_super_secret_key_123"; 

// --- 1. Sign Up ---
export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const findEmail = await userDataSchema.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const encPass = await bcrypt.hash(password, 10);
    const data = await userDataSchema.create({ 
      ...req.body, 
      password: encPass 
    });

    return res.status(201).json({ 
      success: true, 
      message: "User created successfully", 
      body: { id: data._id, name: data.name, email: data.email } 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- 2. Login (With JWT & Role) ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password are required" });
    }

    const user = await userDataSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Token generate karna (Role payload mein dalna zaruri hai)
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      body: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role // Frontend isi role se decide karega admin panel dikhana hai ya nahi
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- 3. Forgot Password ---
export const forgotPassword = async (req, res) => {
  try {
    const user = await userDataSchema.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kaurcsamanpreet@gmail.com",
        pass: "dixf zmkq cnbo xcsg",
      },
    });

    const resetUrl = `http://localhost:5174/user/reset-password/${resetToken}`;

    const mailOptions = {
      from: "MyShop Team <kaurcsamanpreet@gmail.com>",
      to: user.email,
      subject: "Password Reset Request",
      html: `<h3>Password Reset</h3><p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Reset link sent to email!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending email" });
  }
};

// --- 4. Reset Password ---
export const resetPassword = async (req, res) => {
  try {
    const user = await userDataSchema.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Token invalid or expired" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating password" });
  }
};

// --- 5. Find Users (Admin Only typically) ---
export const findUsers = async (req, res) => {
  try {
    const data = await userDataSchema.find().select("-password"); // Password hide karke bhejega
    const count = await userDataSchema.countDocuments();
    return res.json({ success: true, body: data, count });
  } catch (error) { 
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- 6. Delete User ---
export const deleteUser = async (req, res) => {
  try {
    await userDataSchema.findByIdAndDelete(req.params.id);
    const count = await userDataSchema.countDocuments();
    return res.json({ success: true, message: "User deleted", count });
  } catch (error) { 
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- 7. User Update ---
export const userUpdate = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }
    const data = await userDataSchema.findByIdAndUpdate(
      req.body.id,
      updateData,
      { new: true }
    ).select("-password");
    
    return res.json({ success: true, message: "User updated successfully", body: data });
  } catch (error) { 
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Find User By ID (Body) ---
// export const findUserByIdByBody = async (req, res) => {
//   try {
//     const data = await userDataSchema.findById(req.body.id).select("-password");
//     return res.json({ success: true, status: 200, body: data });
//   } catch (error) { 
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Example fix for Find User
export const findUserByIdByBody = async (req, res) => {
  try {
    const data = await userDataSchema.findById(req.body.id).select("-password");
    if(!data) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, body: data }); // res.status() use karein
  } catch (error) { 
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Find User By ID (Params) ---
export const findUserByIdByParams = async (req, res) => {
  try {
    const data = await userDataSchema.findById(req.params.id).select("-password");
    return res.json({ success: true, status: 200, body: data });
  } catch (error) { 
    res.status(500).json({ success: false, message: error.message });
  }
};

