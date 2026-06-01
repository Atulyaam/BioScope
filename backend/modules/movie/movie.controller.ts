import { NextFunction, Request, Response } from "express";
import * as MovieService from "./movie.service";

// all movie controllers whicg are going to point all the movie services

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movie = await MovieService.createMovie(req.body);
    res.status(201).json({ movie });
  } catch (error) {
    next(error);
  }
};

export const getMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movies = await MovieService.getAllMovies();
    res.status(200).json({ movies });
  } catch (error) {
    next(error);
  }
};

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
   const movie = await MovieService.getMovieById(req.params.id as string);
   res.status(200).json({movie})
  } catch (error) {
   next(error)
  }
};

export const getTopRecommendedMovies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
   console.log("[ROUTE HIT] GET /api/v1/movies/recommended");
   const topMovie = await MovieService.getTopMovieByVotes(5);
   console.log("[SUCCESS] Recommended movies fetched:", topMovie?.length ?? topMovie);
   res.status(200).json({topMovie})
  } catch (error) {
   console.error("[ERROR] getTopRecommendedMovies failed:", error);
   next(error)
  }
};
