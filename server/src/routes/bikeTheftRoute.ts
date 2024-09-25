import express from "express"
import bikeTheftController from "../controllers/bikeTheftController"

const router = express.Router()

router.get('/', bikeTheftController.getBikeThefts)
router.post('/', bikeTheftController.addBikeTheft)

export default router