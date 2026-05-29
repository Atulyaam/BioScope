import { Schema } from "mongoose";
import { IShow } from "./show.interface";
import { string } from "zod";

const showSchema = new Schema<IShow>({
   movie:{
      type:Schema.Types.ObjectId,
      ref:"Movie", 
      required:true
   },
   theater:{
      type:Schema.Types.ObjectId
   }
})