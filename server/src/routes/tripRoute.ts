import express from "express"
import tripController from "../controllers/tripController"

const router = express.Router()

router.get('/', tripController.getTripsForUser)
router.get('/total-distance', tripController.getTotalDistanceForUser)

export default router