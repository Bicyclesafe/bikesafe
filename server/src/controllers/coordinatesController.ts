import { Response, Request, NextFunction } from "express"
import { Coordinate } from "../models/coordinate"

export const getCoordinates = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const coordinates: Coordinate[] = await Coordinate.findAll()
    res.status(200).json(coordinates)
  } catch (err) {
    next(err)
  }
}

export const getOneCoordinate = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id

  if (isNaN(Number(id))) {
    res.status(400).json({ message: "ID must be a number" })
    return
  }

  try {
    const coordinate = await Coordinate.findOne({ where: { id } })
    if (!coordinate) {
      res.status(404).json({ message: "Coordinate not found" })
      return
    }
    res.status(200).json(coordinate)
  } catch (err) {
    next(err)
  }
}

export const addCoordinate = async (req: Request<null, null, Coordinate>, res: Response, next: NextFunction) => {
  const { lat, lng } = req.body

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    res.status(400).json({ message: "Latitude and longitude must be numbers" })
    return
  }

  try {
    const coordinate = await Coordinate.create({ lat, lng})
    res.status(201).json(coordinate)
  } catch (err) {
    next(err)
  }
}

export default {
  getCoordinates,
  getOneCoordinate,
  addCoordinate
}