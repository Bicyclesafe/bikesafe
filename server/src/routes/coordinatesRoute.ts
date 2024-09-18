//const router = require('express').Router()
import express from "express"
import { getCoordinates, addCoordinate, getCoordinate } from "../controllers/coordinatesController"

const router = express.Router()

router.get('/', getCoordinates)
router.post("/", addCoordinate)
router.get("/:id", getCoordinate)

export default router