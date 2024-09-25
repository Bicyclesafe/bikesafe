import express from "express"
import coordinatesController from "../controllers/coordinatesController"

const router = express.Router()

router.get('/', coordinatesController.getCoordinates)
router.post("/", coordinatesController.addCoordinate)
router.get("/:id", coordinatesController.getOneCoordinate)

export default router