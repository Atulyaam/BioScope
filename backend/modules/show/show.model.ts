import mongoose, { Schema } from "mongoose";
import { IShow } from "./show.interface";
import { string } from "zod";

const showSchema = new Schema<IShow>({
   movie:{
      type:Schema.Types.ObjectId,
      ref:"Movie", 
      required:true
   },
   theater:{
      type:Schema.Types.ObjectId,
      ref:"Theater",
      required:true
   },
   location:{
      type:String,
      required:true
   },
   formate:{
      type:String,
      enum:["2D","3D","IMAX","PVR PXL"],
      required:true
   },
   audioType:{
      type:String,
      default:"Dolby Atmos"
   },
   startTime:{
      type:String,
      required:true
   },
   date:{
      type:String,
      required:true
   },
   priceMap:{
      type:Map,
      of:Number,
      required:true,
      default:{}
   },
   seatLayout:[]
},{timestamps:true});

export const showModel = mongoose.model<IShow>("Show",showSchema)