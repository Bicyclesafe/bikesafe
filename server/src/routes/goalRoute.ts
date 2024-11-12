import express from "express"
import goalController from "../controllers/goalController"

const router = express.Router()

router.get('/', goalController.getGoalsForUser)
router.get('/current', goalController.getCurrentGoalForUser)

export default router