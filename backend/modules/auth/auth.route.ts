import { isVerifiedUser } from './../../middlewares/auth.middleware';
import { Router } from 'express';
import * as authController from "./auth.controller"
const authRouter = Router();


authRouter.post("/send-otp",authController.sendOTP);
authRouter.post("/verify-otp",authController.verifyOTP);
authRouter.post("/logout",isVerifiedUser,authController.logOut)

export default authRouter;