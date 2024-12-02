import express from "express"
import achievementController from "../controllers/achievementController"

const router = express.Router()

router.get('/', achievementController.getAchievementsForUser)