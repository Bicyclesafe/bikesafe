import express from "express"
import tripController from "../controllers/tripController"

const router = express.Router()

router.get('/', tripController.getTripsForUser)
router.get('/total-distance', tripController.getTotalDistanceForUser)
router.get('/yearly-distance/:year', tripController.getYearlyDistanceForUser)

export default router