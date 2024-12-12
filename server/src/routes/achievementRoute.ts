import express from "express"
import achievementController from "../controllers/achievementController"

const router = express.Router()

router.get('/', achievementController.getAchievements)
router.get('/completed', achievementController.getAchievementsForUser)

export default router