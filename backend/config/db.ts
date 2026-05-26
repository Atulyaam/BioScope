import mongoose from "mongoose"
import { config } from "./config";


const connectDB = async () => {
   try {
      const uri = config.databaseUrl || "mongodb://127.0.0.1:27017/biooscoops";
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
   } catch (error) {
      console.error("DB Connection Error:", error);
      process.exit(1);
   }
};

export default connectDB;