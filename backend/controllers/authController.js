import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";
import transporter from "../config/nodemailer.js";
import { PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";

const maxAge = 7 * 24 * 60 * 60 * 1000;

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge,
        });

        //Sending Welcome Email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Resume Builder",
            text: `Welcome to resume builder. Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOption)

        return res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge,
        });

        return res.json({ success: true, message: "Login successful" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Check if the user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({success: true})
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.json({success: false, message: "Email is required"});
    }

    try {
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password Reset OTP",
            // text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };

        await transporter.sendMail(mailOption);

        return res.json({success: true, message: "OTP sent to your email"});
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Reset password
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword) {
        return res.json({success: false, message: "Email, OTP, New Password are required"});
    }

    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: "User not found"}); 
        }

        if(user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({success: false, message: "Invalid OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()) {
            return res.json({success: false, message: "OTP expired"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        user.password = hashedPassword;

        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({success: true, message: "Password has been reset successfully"})
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Now correctly accessing `id` from `req.user`
        const user = await userModel.findById(userId).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
