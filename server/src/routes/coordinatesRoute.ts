//const router = require('express').Router()
import express from "express"
import { getCoordinates, addCoordinate } from "../controllers/coordinatesController"

const router = express.Router()

router.get('/', getCoordinates)
router.post("/", addCoordinate)

export default router