import express from "express"
import lockStationController from "../controllers/lockStationController"

const router = express.Router()

router.get('/', lockStationController.getLockStations)

export default router