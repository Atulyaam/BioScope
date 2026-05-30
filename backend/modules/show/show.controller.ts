import { Request, Response, NextFunction } from "express";
import * as showService from "./show.service";

export const createShow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const show = await showService.createShow(req.body);
    res.status(201).json(show);
  } catch (error) {
    next(error);
  }
};

export const getShowsByMovieDateAndLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { movieId, date } = req.query;
    const location = (req.query.state ?? req.query.locationId) as string;
    const show = await showService.getShowsByMovieDateAndLocation(
      movieId as string,
      date as string,
      location,
    );
    res.status(200).json(show);
  } catch (error) {
    next(error);
  }
};

export const getShowById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const show = await showService.getShowById(req.params.id as string);
    res.status(200).json(show);
  } catch (error) {
    next(error);
  }
};

export const updateSeatStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { row, seatNumber, status } = req.query;
    const updatedShow = await showService.updateSeatStatus(
      req.params.showId as string,
      row as string,
      seatNumber as string,
      status as "AVAILABLE" | "BOOKED" | "BLOCKED",
    );
    res.status(200).json(updatedShow);
  } catch (error) {
    next(error);
  }
};
