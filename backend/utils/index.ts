import { Types } from "mongoose";
import { IMovie } from "../modules/movie/movie.interface";
import { ITheater } from "../modules/theater/theater.interface";
import { IShow } from "../modules/show/show.interface";

type GroupedShow = {
  movie: Types.ObjectId | IMovie;
  theater: {
    theaterDetails: Types.ObjectId | ITheater;
    shows: Array<{
      _id: string;
      date: string;
      startTime: string;
      formate: string;
      audioType: string;
      availabilityStatus: "AVAILABLE" | "FAST_FILLING" | "FULL";
    }>;
  };
};

export const isValidEmail = (email: string): boolean => {
  const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegix.test(email);
};

export const generateSeatLayout = (
  seatLayoutConfig?: {
    row: string;
    type: string;
    price: number;
    seatCount: number;
  }[],
) => {
  const config =
    seatLayoutConfig && seatLayoutConfig.length > 0
      ? seatLayoutConfig
      : [
          // Front of screen → cheapest seats first
          { row: "A", type: "NORMAL", price: 180, seatCount: 26 },
          { row: "B", type: "NORMAL", price: 180, seatCount: 26 },
          { row: "C", type: "NORMAL", price: 180, seatCount: 26 },
          { row: "D", type: "EXECUTIVE", price: 290, seatCount: 24 },
          { row: "E", type: "EXECUTIVE", price: 290, seatCount: 24 },
          { row: "F", type: "EXECUTIVE", price: 290, seatCount: 24 },
          { row: "G", type: "PREMIUM", price: 510, seatCount: 20 },
          { row: "H", type: "PREMIUM", price: 510, seatCount: 20 },
          // Back of screen → premium/recliner last
          { row: "I", type: "RECLINER", price: 750, seatCount: 10 },
        ];

  return config.map((rowDef) => ({
    row: rowDef.row,
    type: rowDef.type,
    price: rowDef.price,
    seats: Array.from({ length: rowDef.seatCount }, (_, i) => ({
      number: i + 1,
      status: "AVAILABLE",
    })),
  }));
};

export const groupShowsByTheaterAndMovie = (shows: IShow[]): GroupedShow[] => {
  const grouped: Record<string, GroupedShow> = {};
  shows.forEach((show) => {
    const movieId = show.movie._id;
    const theaterId = show.theater._id;
    const key = `${movieId}_${theaterId}`;

    if (!grouped[key]) {
      grouped[key] = {
        movie: show.movie,
        theater: {
          theaterDetails: show.theater,
          shows: [],
        },
      };
    }

    // Compute seat availability from seatLayout
    const layout = Array.isArray(show.seatLayout) ? show.seatLayout : [];
    const totalSeats = layout.reduce(
      (acc: number, row: any) => acc + (row.seats?.length ?? 0),
      0,
    );
    const availableSeats = layout.reduce(
      (acc: number, row: any) =>
        acc +
        (row.seats?.filter((s: any) => s.status === "AVAILABLE").length ?? 0),
      0,
    );
    let availabilityStatus: "AVAILABLE" | "FAST_FILLING" | "FULL" = "AVAILABLE";
    if (totalSeats > 0) {
      const ratio = availableSeats / totalSeats;
      if (ratio === 0) availabilityStatus = "FULL";
      else if (ratio < 0.4) availabilityStatus = "FAST_FILLING";
      else availabilityStatus = "AVAILABLE";
    }

    grouped[key].theater.shows.push({
      _id: show._id ?? "",
      date: show.date ?? "",
      startTime: show.startTime ?? "",
      formate: show.formate ?? "",
      audioType: show.audioType ?? "",
      availabilityStatus,
    });
  });
  return Object.values(grouped);
};
