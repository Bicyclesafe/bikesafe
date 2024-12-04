import express from "express"
import userController from "../controllers/userController"

const router = express.Router()

router.post('/', userController.addUser)
router.get('/role', userController.getUserRole)

export default router