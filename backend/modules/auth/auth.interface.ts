import mongoose from "mongoose";

export interface IOtpPayload {
   email:string,
   code:string,
};

export interface IRefreshTokenPayload{
   token:string,
   userId: mongoose.Types.ObjectId;
   createdAt:Date;
};

export interface ITokenPayload{
   id:string,
   email?:string,
   phone?:number,
   role?:string
}