import { Response, Request } from "express"
import { Coordinate } from "../models/coordinate"

export const getCoordinates = async (_req: Request, res: Response) => {
  const coordinates = await Coordinate.findAll()
  res.json(coordinates)
}