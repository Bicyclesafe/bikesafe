import { Response, Request } from "express"
import { Coordinate } from "../models/coordinate"

export const getCoordinates = async (_req: Request, res: Response) => {
  const coordinates = await Coordinate.findAll()
  res.json(coordinates)
}

export const getOneCoordinate = async (req: Request, res: Response) => {
  const id = req.params.id
  const coordinate = await Coordinate.findOne({where: {id: id}})
  res.json(coordinate)
}

export const addCoordinate = async (req: Request<null, null, Coordinate>, res: Response) => {
  const { lat, lng } = req.body
  const coordinate = await Coordinate.create({ lat, lng})
  res.json(coordinate)
}

export default {
  getCoordinates,
  getOneCoordinate,
  addCoordinate
}