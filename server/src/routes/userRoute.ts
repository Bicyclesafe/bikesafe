import express from "express"
import tripController from "../controllers/tripController"

const router = express.Router()

router.get('/:uid/trips', tripController.getTripsForUser)
router.get('/:uid/total-distance', tripController.getTotalDistanceForUser)

export default router