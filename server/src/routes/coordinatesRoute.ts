const router = require('express').Router()
import { getCoordinates } from "../controllers/coordinatesController"

router.get('/', getCoordinates)

module.exports = router