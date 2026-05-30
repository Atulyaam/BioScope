import { Router } from "express";
import * as showController from "./show.controller"

const showRouter = Router();



showRouter.post("/",showController.createShow)

showRouter.get("/",showController.getShowsByMovieDateAndLocation)


showRouter.get("/:id",showController.getShowById)


showRouter.put("/:showId",showController.updateSeatStatus)


export default showRouter

