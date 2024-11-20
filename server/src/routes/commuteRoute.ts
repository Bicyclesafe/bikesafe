import express from "express"
import commuteController from "../controllers/commuteController"

const router = express.Router()

router.get('/', commuteController.getCommuteDistance)
router.post('/', commuteController.addCommuteDistance)

export default router