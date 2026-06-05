
import mongoose from "mongoose";
import { ITheater } from "./theater.interface";

const seatRowConfigSchema = new mongoose.Schema({
   row:   { type: String, required: true },
   type:  { type: String, enum: ["PREMIUM","EXECUTIVE","NORMAL","RECLINER"], required: true },
   price: { type: Number, required: true },
   seatCount: { type: Number, required: true },
}, { _id: false });

const theaterSchema = new mongoose.Schema<ITheater>({
   name:{
      type:String,
      required:true
   },
   location:{
      type:String,
      required:true
   },
   logo:{
      type:String,
      required:true
   },
   city:{
      type:String,
      required:true,
   },
   state:{
      type:String,
      required:true
   },
   seatLayoutConfig:{
      type:[seatRowConfigSchema],
      default:[
         // Front of screen → cheapest seats first
         { row:"A", type:"NORMAL",    price:180, seatCount:26 },
         { row:"B", type:"NORMAL",    price:180, seatCount:26 },
         { row:"C", type:"NORMAL",    price:180, seatCount:26 },
         { row:"D", type:"EXECUTIVE", price:290, seatCount:24 },
         { row:"E", type:"EXECUTIVE", price:290, seatCount:24 },
         { row:"F", type:"EXECUTIVE", price:290, seatCount:24 },
         { row:"G", type:"PREMIUM",   price:510, seatCount:20 },
         { row:"H", type:"PREMIUM",   price:510, seatCount:20 },
         // Back of screen → premium/recliner last
         { row:"I", type:"RECLINER",  price:750, seatCount:10 },
      ]
   },
},{timestamps:true});

export const TheaterModel = mongoose.model<ITheater>("Theater",theaterSchema)