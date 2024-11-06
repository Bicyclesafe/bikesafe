import { Response, Request, NextFunction } from "express"
import { Trip } from "../models/trip"
import { User } from "../models/user"

export const getTripsForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params
    const user: User | null = await User.findOne({ where: { uid }})
    const trips: Trip[] = await Trip.findAll({ where: { userId: user?.id }})
    res.status(200).json(trips)
  } catch (err) {
    next(err)
  }
}

export const getTotalDistanceForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params
    const user: User | null = await User.findOne({ where: { uid }})
    const trips = await Trip.sum('trip_distance', { where: { userId: user?.id }})
    res.status(200).json(trips)
  } catch (err) {
    next(err)
  }
}

export default {
  getTripsForUser,
  getTotalDistanceForUser
}