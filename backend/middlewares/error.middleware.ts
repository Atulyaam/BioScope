import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const globalErrorHandler = (
   err:unknown,
   req:Request,
   res:Response,
   next:NextFunction
)=>{
   // Default reponse
   let statusCode = 500;
   let message = "Something went Wrong!";
   let error:{
      field?:string;
      message:string;
   }[]=[];

   // Zod error handeling
   if(err instanceof ZodError){
      statusCode = 400;
      message = "validation Error";
      error = err.issues.map((e)=>({
         field:e.path.join("."),
         message:e.message
      }))
   }else if(err instanceof Error){
      message = err.message;
   }

   res.status(statusCode).json({
      success:false,
      message,
      errors:error
   })
}