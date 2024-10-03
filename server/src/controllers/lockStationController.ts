import { Response, Request, NextFunction } from "express"
import { Coordinate } from "../models/coordinate"
import { LockStation } from "../models/lockStation"
// import { getAllLockStations } from "../services/lockStationService"

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

// export const getLockStations = async (_req: Request, res: Response, next: NextFunction) => {
//   try {
//     const lockStations = await getAllLockStations()
//     res.status(200).json(lockStations)
//   } catch (err) {
//     next(err)
//   }
// }

export const addLockStation = async (req: Request<null, null, Coordinate>, res: Response, next: NextFunction) => {
  const { lat, lng } = req.body

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    res.status(400).json({ message: "Latitude and longitude must be numbers" })
    return
  }

  try {
    const result = await saveLockStation(lat, lng)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

export const saveLockStation = async (lat: number, lng: number) => {
  try {
    const existingCoordinate = await Coordinate.findOne({ where: { lat, lng } })

    if (!existingCoordinate) {
      const newCoordinate = await Coordinate.create({ lat, lng })
      const lockStation = await LockStation.create({ coordinateId: newCoordinate.id })
      const result = await LockStation.findByPk(lockStation.id, {
        include: {
          model: Coordinate,
        }
      })
      return result
    }
    return existingCoordinate
  } catch(err) {
    console.error('Error saving lock stations:', err)
    throw new Error('Failed to save lock stations')
  }
}

export default {
  getLockStations,
  addLockStation,
  saveLockStation
}