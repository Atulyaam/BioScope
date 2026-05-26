import express from 'express';
import * as MovieController from "./movie.controller"



const movieRouter = express.Router();

movieRouter.post("/",MovieController.createMovie)


movieRouter.get("/",MovieController.getMovie)


movieRouter.get("/",MovieController.getTopRecommendedMovies)


movieRouter.get("/",MovieController.getMovieById)


export default movieRouter;
