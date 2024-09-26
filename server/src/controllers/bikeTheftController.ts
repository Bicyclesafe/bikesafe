import { Response, Request, NextFunction } from "express"
import { BikeTheft } from "../models/bikeTheft"
import { Coordinate } from "../models/coordinate"

export const getBikeThefts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const bikeThefts: BikeTheft[] = await BikeTheft.findAll({
      include: {
        model: Coordinate,
      }
    })
    res.status(200).json(bikeThefts)
  } catch (err) {
    next(err)
  }
}

export const addBikeTheft = async (req: Request<null, null, Coordinate>, res: Response, next: NextFunction) => {
  const { lat, lng } = req.body

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    res.status(400).json({ message: "Latitude and longitude must be numbers" })
    return
  }

  try {
    const coordinate = await Coordinate.create({ lat, lng })
    const bikeTheft = await BikeTheft.create({ coordinateId: coordinate.id })
    const result = await BikeTheft.findByPk(bikeTheft.id, {
      include: {
        model: Coordinate,
      }
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

export default {
  getBikeThefts,
  addBikeTheft
}