import express from "express"
import tripController from "../controllers/tripController"
import goalController from "../controllers/goalController"

const router = express.Router()

router.get('/trips', tripController.getTripsForUser)
router.get('/trips/date-range', tripController.getTripsBetweenDates)
router.get('/total-distance', tripController.getTotalDistanceForUser)
router.get('/goals', goalController.getGoalsForUser)
router.get('/goals/current', goalController.getCurrentGoalForUser)

export default router