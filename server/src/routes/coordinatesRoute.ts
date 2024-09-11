//const router = require('express').Router()
import express from "express"
import { getCoordinates } from "../controllers/coordinatesController"

const router = express.Router()

router.get('/', getCoordinates)

export default router