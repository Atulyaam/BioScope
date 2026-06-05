// seed/showSeeder.ts
import mongoose from "mongoose";
import dayjs from "dayjs";
import { MovieModel } from "../modules/movie/movie.model";
import { TheaterModel } from "../modules/theater/theater.model";
import { showModel as ShowModel } from "../modules/show/show.model";
import { config } from "../config/config";
import { generateSeatLayout } from "../utils/index";

const generatePriceMap = () =>
  new Map([
    ["PREMIUM", 510],
    ["EXECUTIVE", 290],
    ["NORMAL", 270],
  ]);

const formats = ["2D", "3D", "IMAX", "PVR PXL"];

// 🎞️ Realistic time slots
const fixedTimeSlots = [
  { start: "09:00 AM", end: "11:30 AM" },
  { start: "12:30 PM", end: "03:00 PM" },
  { start: "04:00 PM", end: "06:30 PM" },
  { start: "07:30 PM", end: "10:00 PM" },
  { start: "10:30 PM", end: "01:00 AM" },
];


export const seedShow = async () => {
  // Seed shows for ALL movies in the DB
  const movies = await MovieModel.find({});
  // Seed shows for all Maharashtra theatres
  const theatres = await TheaterModel.find({ state: "Maharashtra" });

  if (!movies.length) {
    console.error("No movies found. Run seed-movies first.");
    return;
  }
  if (!theatres.length) {
    console.error("No theatres found for Maharashtra. Run seed-theater first.");
    return;
  }

  console.log(`🎬 Seeding shows for ${movies.length} movies across ${theatres.length} Maharashtra theatres...`);

  const today = dayjs().startOf("day");

  for (const movie of movies) {
    for (const theatre of theatres) {
      for (let d = 0; d < 7; d++) {
        // ✅ today through next 6 days (7 total)
        const showDate = today.add(d, "day");
        const formattedDate = showDate.format("DD-MM-YYYY");
        const numShows = Math.floor(Math.random() * 3) + 2; // 2–4 shows per day
        const selectedSlots = fixedTimeSlots.slice(0, numShows);

        for (const slot of selectedSlots) {
          const newShow = new ShowModel({
            movie: movie._id,
            theater: theatre._id,
            location: theatre.state,  // "Maharashtra"
            formate: formats[Math.floor(Math.random() * formats.length)],
            audioType: "Dolby 7.1",
            startTime: slot.start,
            date: formattedDate, // "DD-MM-YYYY"
            priceMap: generatePriceMap(),
            seatLayout: generateSeatLayout(),
          });

          await newShow.save();
          console.log(
            `✅ ${movie.title} | ${theatre.name} | ${formattedDate} | ${slot.start}`,
          );
        }
      }
    }
  }

  console.log("✅ Show seeding completed for ALL movies in Maharashtra.");
};

mongoose
  .connect(config.databaseUrl as string)
  .then(async () => {
    console.log("DB connected");
    await ShowModel.deleteMany({});
    console.log("🧹 Existing shows deleted.");
    await seedShow();
    mongoose.disconnect();
  })
  .catch((err) => console.log(err));
