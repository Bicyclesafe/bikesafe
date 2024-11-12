import { Response, Request, NextFunction } from "express"
import { Trip } from "../models/trip"
import { User } from "../models/user"
import { Op } from 'sequelize'

export const getTripsForUser = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const uid = req.body.uid
    const user: User | null = await User.findOne({ where: { uid }})
    const trips: Trip[] = await Trip.findAll({ where: { userId: user?.id }})
    res.status(200).json(trips)
  } catch (err) {
    next(err)
  }
}

export const getTotalDistanceForUser = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  const uid = req.body.uid

  try {
    const user: User | null = await User.findOne({ where: { uid }})

    if (!user) {
      res.status(404).json({ error: "User not found" })
      return 
    }

    const trips = await Trip.sum('trip_distance', { where: { userId: user?.id }})
    res.status(200).json(trips)
  } catch (err) {
    next(err)
  }
}

export const getYearlyDistanceForUser = async (req: Request<{year: string}, null, {uid: string}>, res: Response, next: NextFunction) => {
  const uid = req.body.uid
  const year = req.params.year
  const startTime = new Date(`${year}-01-01 00:00:00`)
  const endTime = new Date(`${year}-12-31 23:59:59`)
  try {
    const user: User | null = await User.findOne({ where: { uid }})

    if (!user) {
      res.status(404).json({ error: "User not found" })
      return 
    }
    const trips = await Trip.sum('trip_distance', { 
      where: { 
        userId: user.id, 
        startTime: {
          [Op.between]: [startTime, endTime]
        }
      }
    })
    res.status(200).json(trips)
  } catch (err) {
    next(err)
  }
}

export default {
  getTripsForUser,
  getTotalDistanceForUser,
  getYearlyDistanceForUser
}