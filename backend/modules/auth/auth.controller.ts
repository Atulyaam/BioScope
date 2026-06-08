import { isValidEmail } from './../../utils/index';
import { NextFunction, Request, Response } from "express";
import * as OtpService from "./otp.service"
import * as UserService from "../user/user.service"
import * as TokenService from "./token.service";
import createHttpError from "http-errors";


 export const sendOTP = async (req:Request,res:Response,next:NextFunction)=>{
   try {
      const { email } = req.body;
      if(!email){
         const err = createHttpError.BadRequest("Email is Required");
         return next(err);

      }

      if(!isValidEmail(email)){
         const err = createHttpError.BadRequest("Invalid Email Formate");
         return next(err);
      }

      // create otp;
      const otp = OtpService.generateOTP();

      // hash otp with email 
      const ttl = 1000*60*2;
      const expires = Date.now()+ttl;
      const data = `${email}.${otp}.${expires}`;
      const hashOTP = OtpService.hashOTP(data);

      // send otp to users emmail;
      try {
         await OtpService.sendOTPEmail(email,otp);
      } catch (error) {
         const err = createHttpError.InternalServerError("Error sending otp to email");
         return next(err);
      }


      // response to the client.
      res.json({
         hash: `${hashOTP},${expires}`,
         email,
         msg: "Otp sent to email successfully"
      })
      
   } catch (error) {
      next(error);
   }
}


export const verifyOTP = async (req:Request,res:Response,next:NextFunction)=>{
   const {email,otp,hash} = req.body;
   if(!email || !otp || !hash){
      const err = new createHttpError.BadRequest("All feilds are required");
      return next(err)
   }

   // otp verification
   const [hashOTP,expires] = hash.split(".");
   if(Date.now()>+expires){
      const err = new createHttpError.Gone("OTP Expires");
      return next(err)
   }
   const data = `${email}.${otp}.${expires}`;
   const isValid = OtpService.verifyOTP(hashOTP,data);

   if(!isValid){
      const err = new createHttpError.Unauthorized("Invalid Otp");
      return next(err)
   }

   // find orr create new user 
   let user;
   try {
      user = await UserService.getUserByEmail(email);
      if(!user){
         user = await UserService.createUser(email);
      }
      
   } catch (error) {
      return next(error)
   }

   // generate jwt 
   const {accessToken , refreshToken} = await TokenService.generateToken({
      _id:user._id,
      email:user.email
   })

   // store the tokens 
   await TokenService.storeRefreshToken(user._id as string,refreshToken)

   // sendiing tokens in cookies 
    res.cookie("accessToken",accessToken,{
      maxAge:1000*60*60 ,
      httpOnly:true,
      sameSite:"lax",
      secure:true
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    res.json({
      auth:true,
      user
    })
}


export const logOut = async (req:Request,res:Response,next:NextFunction)=>{
   try {
      const {refreshToken} = req.cookies;

      // deleteRefreshToken from db 
      await TokenService.deleteRefreshToken(refreshToken)

      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      res.json({
         msg:"Logout Successfully"
      }).status(200);
      
   } catch (error) {
      next(error);
      
   }
}


