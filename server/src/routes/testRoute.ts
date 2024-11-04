import express from "express"
import { test } from "../controllers/testController"

const router = express.Router()
router.post('/', test)

export default router