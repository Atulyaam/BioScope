import dotenv from "dotenv";
import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"
import globalRouter from "./routes";
import { globalErrorHandler } from "./middlewares/error.middleware";




dotenv.config();

const app = express()

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(cookieParser())
app.use(express.json());


// Global Router
app.use("/api/v1/",globalRouter)

// Global error handelers
app.use(globalErrorHandler)

app.get("/",(_,res)=>{
   res.json({
      message:"Welcome to BioScoope Apii"
   })
})


export default app;

