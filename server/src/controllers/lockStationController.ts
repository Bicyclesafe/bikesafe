import { Response, Request } from "express"
import { Coordinate } from "../models/coordinate"
import { LockStation } from "../models/lockStation"

export const getLockStations = async (_req: Request, res: Response) => {
  const lockStation = await LockStation.findAll({
    include: {
      model: Coordinate,
    }
  })
  res.json(lockStation)
}

export const addLockStation = async (req: Request<null, null, Coordinate>, res: Response) => {
  const { lat, lng } = req.body
  const coordinate = await Coordinate.create({ lat, lng })
  const lockStation = await LockStation.create({ coordinateId: coordinate.id })
  const result = await LockStation.findByPk(lockStation.id, {
    include: {
      model: Coordinate,
    }
  })
  res.json(result)
}

export default {
  getLockStations,
  addLockStation
}