import { Response, Request } from "express"
import { Coordinate } from "../models/coordinate"
import { LockStation } from "../models/lockStation"

export const getCoordinates = async (_req: Request, res: Response) => {
  const coordinates = await LockStation.findAll()
  res.json(coordinates)
}

export const getOneCoordinate = async (req: Request, res: Response) => {
  const id = req.params.id
  const lockStation = await LockStation.findOne({where: {id: id}})
  res.json(lockStation)
}

export const addCoordinate = async (req: Request<null, null, Coordinate>, res: Response) => {
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
  getCoordinates,
  getOneCoordinate,
  addCoordinate
}