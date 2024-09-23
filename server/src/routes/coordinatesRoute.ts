import express from "express"
import coordinatesController from "../controllers/coordinatesController"

const router = express.Router()

router.get('/', coordinatesController.getLockStation)
router.post("/", coordinatesController.addLockStation)
router.get("/:id", coordinatesController.getLockStation)

export default router