// generate accesstoken and refresh token 

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt: any = require("jsonwebtoken");
type JwtPayload = Record<string, unknown>;
import { ITokenPayload } from "./auth.interface";
import { config } from "../../config/config";
import { RefreshTokenModel } from "./refresh.model";

// generate refresh and access tokens
export const generateToken = async(payload:ITokenPayload): Promise<{accessToken:string,refreshToken:string}> =>{
   const accessToken = jwt.sign(payload,config.accessTokenSecret,{expiresIn:"1h"});
   const refreshToken = jwt.sign(payload,config.refreshTokenSecret, {expiresIn:"7d"});
   return {accessToken,refreshToken};

}


// store refresh token in DB

export const storeRefreshToken = async (userId:string, refreshToken:string): Promise<void> =>{
   try {
      await RefreshTokenModel.create({userId,token:refreshToken})
      
   } catch (error) {
      throw error;
   }
}


// verify access Token 
export const verifyAccessToken = (token:string):ITokenPayload| JwtPayload =>{
   return jwt.verify(token,config.accessTokenSecret) as ITokenPayload | JwtPayload

}


// verify refresh token 
export const verifyRefreshToken = (token:string):ITokenPayload | JwtPayload =>{
   return jwt.verify(token,config.refreshTokenSecret) as ITokenPayload | JwtPayload

}

// DB operations on refresh token 
export const findRefreshToken = async (userId:string, token:string):Promise<{userId:string, token:string}|null>=>{
   return await RefreshTokenModel.findOne({userId, token});

}

export const deleteRefreshToken = async (token:string):Promise<{userId:string,token:string}|null>=>{
   return await RefreshTokenModel.findOneAndDelete({token});
}


export const updateRefreshToken = async (userId:string,newToken:string):Promise<void>=>{
   try {
      await RefreshTokenModel.updateOne({userId},{token:newToken},{upsert:true});
      
   } catch (error) {
      throw error;
   }
}