import express from 'express';
import * as MovieController from "./movie.controller"
import { validate } from '../../middlewares/validate';
import { MovieSchema } from './movie.validation';



const movieRouter = express.Router();

movieRouter.post("/", validate(MovieSchema as any) as any, MovieController.createMovie)


movieRouter.get("/",MovieController.getMovie)


movieRouter.get("/recommended",MovieController.getTopRecommendedMovies)


movieRouter.get("/:id",MovieController.getMovieById)


export default movieRouter;
