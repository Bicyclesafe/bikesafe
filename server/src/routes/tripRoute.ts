import express from "express"
import tripController from "../controllers/tripController"

const router = express.Router()

router.get('/', tripController.getTripsForUser)
router.post("/", tripController.addTrip)
router.get('/sum-date-range', tripController.getSumOfTripsBetweenDates)
router.get('/total-distance', tripController.getTotalDistanceForUser)
router.get('/date-range', tripController.getTripsBetweenDates)

export default router