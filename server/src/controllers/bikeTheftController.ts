import { Response, Request } from "express"
import { BikeTheft } from "../models/bikeTheft"
import { Coordinate } from "../models/coordinate"

export const getBikeThefts = async (_req: Request, res: Response) => {
  const bikeThefts = await BikeTheft.findAll({
    include: {
      model: Coordinate,
    }
  })
  res.json(bikeThefts)
}

export const addBikeTheft = async (req: Request<null, null, Coordinate>, res: Response) => {
  const { lat, lng } = req.body
  const coordinate = await Coordinate.create({ lat, lng })
  const bikeTheft = await BikeTheft.create({ coordinateId: coordinate.id })
  const result = await BikeTheft.findByPk(bikeTheft.id, {
    include: {
      model: Coordinate,
    }
  })
  res.json(result)
}

export default {
  getBikeThefts,
  addBikeTheft
}