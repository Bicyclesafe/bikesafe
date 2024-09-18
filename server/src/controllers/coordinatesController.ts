import { Response, Request } from "express"
import { Coordinate } from "../models/coordinate"

export const getCoordinates = async (_req: Request, res: Response) => {
  const coordinates = await Coordinate.findAll()
  res.json(coordinates)
}

export const getCoordinate = async (req: Request, res: Response) => {
  const id = req.params.id
  const coordinate = await Coordinate.findOne({where: {id: id}})
  res.json(coordinate)
}

export const addCoordinate = async (req: Request<null, null, Coordinate>, res: Response) => {
  const newCoordinate = req.body
  console.log(typeof newCoordinate.lat)
  console.log(typeof newCoordinate.lng)
  const coordinate = await Coordinate.create({lat: newCoordinate.lat, lng: newCoordinate.lng})
  res.json(coordinate)
}