import express from "express"
import tripController from "../controllers/tripController"
import goalController from "../controllers/goalController"

const router = express.Router()

router.get('/:uid/trips', tripController.getTripsForUser)
router.get('/:uid/trips/date-range', tripController.getTripsBetweenDates)
router.get('/:uid/total-distance', tripController.getTotalDistanceForUser)
router.get('/:uid/goals', goalController.getGoalsForUser)
router.get('/:uid/goals/current', goalController.getCurrentGoalForUser)

export default router