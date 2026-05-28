import express from 'express';
import movieRouter from '../modules/movie/movie.route';
import theaterRouter from '../modules/theater/theater.route';



const globalRouter = express.Router()

globalRouter.use("/movies",movieRouter)

globalRouter.use("/theaters",theaterRouter)


export default globalRouter;