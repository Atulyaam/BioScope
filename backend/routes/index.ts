import express from "express";
import movieRouter from "../modules/movie/movie.route";
import theaterRouter from "../modules/theater/theater.route";
import showRouter from "../modules/show/show.routes";

const globalRouter = express.Router();

globalRouter.use("/movies", movieRouter);

globalRouter.use("/theaters", theaterRouter);

globalRouter.use("/show", showRouter);
globalRouter.use("/shows", showRouter);

export default globalRouter;
