import express from "express";
import { resetDatabase } from "../controllers/testingController";

const router = express.Router()
router.post('/reset/db', resetDatabase)

export default router