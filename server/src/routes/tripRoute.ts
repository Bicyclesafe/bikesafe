import express from "express"
import tripController from "../controllers/tripController"

const router = express.Router()

router.get('/', tripController.getTripsForUser)
router.post('/', tripController.addTrip)
router.post('/work-trip', tripController.addWorkTrip)
router.get('/sum-date-range', tripController.getSumOfTripsBetweenDates)
router.get('/total-distance', tripController.getTotalDistanceForUser)
router.get('/date-range', tripController.getTripsBetweenDates)
router.get('/all-users', tripController.getTripsForAllUsers)

export default router