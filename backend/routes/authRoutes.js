import { Router } from "express";
import { isAuthenticated, login, logout, resetPassword, sendResetOtp, signup } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/is-auth", userAuth, isAuthenticated)
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;