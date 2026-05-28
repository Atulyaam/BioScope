import { NextFunction } from "express";
import { AnyZodObject } from "zod/v3";


export const validate = (schema:AnyZodObject)=>(req:Request,res:Response,next:NextFunction)=>{
   try {
      schema.parse(req.body); //ensure type safty at run time
      next()
   } catch (error) {
      next(error) // global error handlers take care
   }

}