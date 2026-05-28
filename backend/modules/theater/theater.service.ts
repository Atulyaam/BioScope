// 1. Create Theater

import { ITheater } from "./theater.interface";
import { TheaterModel } from "./theater.model";

export const createTheater = async (data: ITheater): Promise<ITheater> => {
  return await TheaterModel.create(data);
};

// 2. GetAllTheater
export const GetAllTheater = async (): Promise<ITheater[]> => {
  return await TheaterModel.find();
};

// 3. getTheaterById

export const getTheaterById = async (id: string): Promise<ITheater | null> => {
  return await TheaterModel.findById(id);
};
// 4. getTheaterByState
export const getTheaterByState = async (state: string): Promise<ITheater[]> => {
  return await TheaterModel.find({ state: { $regex: state, $options: "i" } });
};

// 5. getTheatorByCity
export const getTheaterByCity = async (city: string): Promise<ITheater[]> => {
  return await TheaterModel.find({ city: { $regex: city, $options:"i" } });
};