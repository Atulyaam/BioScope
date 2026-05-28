import  express  from 'express';
import * as TheaterController from "./theater.controller"
import { validate } from '../../middlewares/validate';
import { TheaterSchema } from './theater.validation';

const theaterRouter = express.Router()


theaterRouter.post("/", validate(TheaterSchema as any) as any, TheaterController.createTheater)

theaterRouter.get("/", TheaterController.getAllTheater)

theaterRouter.get("/:id", TheaterController.getTheaterById)

export  default theaterRouter;