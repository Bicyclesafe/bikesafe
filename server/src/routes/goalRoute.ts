import express from "express"
import goalController from "../controllers/goalController"

const router = express.Router()

router.get('/', goalController.getGoalsForUser)
router.post('/', goalController.addGoal)
router.get('/current', goalController.getCurrentGoalForUser)


export default router