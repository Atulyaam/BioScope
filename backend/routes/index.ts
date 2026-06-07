import express from "express";
import movieRouter from "../modules/movie/movie.route";
import theaterRouter from "../modules/theater/theater.route";
import showRouter from "../modules/show/show.routes";
import userRouter from "../modules/user/user.route";

const globalRouter = express.Router();

globalRouter.use("/movies", movieRouter);

globalRouter.use("/theaters", theaterRouter);

globalRouter.use("/show", showRouter);

globalRouter.use("/user", userRouter);


export default globalRouter;
