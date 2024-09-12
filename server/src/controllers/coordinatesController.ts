import { Response, Request } from "express"
import { Coordinate } from "../models/coordinate"

export const getCoordinates = async (_req: Request, res: Response) => {
  const coordinates = await Coordinate.findAll()
  res.json(coordinates)
}

export const addCoordinate = async (req: Request<null, null, Coordinate>, res: Response) => {
  const newCoordinate = req.body
  console.log(req.body)
  const coordinate = await Coordinate.create({lat: newCoordinate.lat, lng: newCoordinate.lng})
  res.json(coordinate)
}