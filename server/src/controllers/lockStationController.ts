import { Response, Request, NextFunction } from "express"
import { Coordinate } from "../models/coordinate"
import { LockStation } from "../models/lockStation"

export const getLockStations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const lockStation = await LockStation.findAll({
      include: {
        model: Coordinate,
      }
    })
    res.status(200).json(lockStation)
  } catch (err) {
    next(err)
  }
}

export const addLockStation = async (req: Request<null, null, Coordinate>, res: Response, next: NextFunction) => {
  const { lat, lng } = req.body

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    res.status(400).json({ message: "Latitude and longitude must be numbers" })
    return
  }

  try {
    const coordinate = await Coordinate.create({ lat, lng })
    const lockStation = await LockStation.create({ coordinateId: coordinate.id })
    const result = await LockStation.findByPk(lockStation.id, {
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
  getLockStations,
  addLockStation
}