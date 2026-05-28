import { NextFunction, Request, Response } from "express";
import * as TheaterService from "./theater.service";

export const createTheater = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const theater = await TheaterService.createTheater(req.body);
    res.status(201).json({ theater });
  } catch (error) {
    next(error);
  }
};

export const getAllTheater = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const theaters = await TheaterService.GetAllTheater();
    res.status(200).json({ theaters });
  } catch (error) {
    next(error);
  }
};

export const getTheaterById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const theater = await TheaterService.getTheaterById(
      req.params.id as string,
    );
    res.status(200).json({ theater });
  } catch (error) {
    next(error);
  }
};

export const getTheaterByState = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const theaters = await TheaterService.getTheaterByState(
      req.params.state as string,
    );
    res.status(200).json({ theaters });
  } catch (error) {
    next(error);
  }
};

export const getTheaterByCity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const theaters = await TheaterService.getTheaterByCity(
      req.params.city as string,
    );
    res.status(200).json({ theaters });
  } catch (error) {
    next(error);
  }
};
