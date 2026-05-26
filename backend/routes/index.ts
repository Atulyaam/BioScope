import express from 'express';
import movieRouter from '../modules/movie/movie.route';



const globalRouter = express.Router()

globalRouter.use("/movies",movieRouter)


export default globalRouter;