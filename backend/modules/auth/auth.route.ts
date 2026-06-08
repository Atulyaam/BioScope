import { Router } from 'express';
import * as authController from "./auth.controller"
const authRouter = Router();


authRouter.post("/send-otp",authController.sendOTP);
authRouter.post("/verify-otp",authController.verifyOTP);

export default authRouter;