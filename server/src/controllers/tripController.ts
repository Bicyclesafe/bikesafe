import { Response, Request, NextFunction } from "express"
import { Trip } from "../models/trip"
import { User } from "../models/user"
import { Op } from "sequelize"
import { Commute } from "../models/commute"

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
  
export const getTripsBetweenDates = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const uid = req.body.uid
    const { startTime, endTime } = req.query
    const user: User | null = await User.findOne({ where: { uid }})
    const trips  = await Trip.sum('trip_distance', { where: { userId: user?.id, startTime: { [Op.gte]: startTime}, endTime: {[Op.lte]: endTime}}})
    res.status(200).json(trips)
  } catch(err) {
    next(err)
  }
}

export const addTrip = async (req: Request<null, null, {uid: string, startTime: Date, endTime: Date}>, res: Response, next: NextFunction) => {
  try {
    const { startTime, endTime, uid } = req.body
    const user: User | null = await User.findOne({ where: { uid }})
    const commute = await Commute.findOne({ where: { userId: user?.id }})
    await Trip.create({ 
      userId: user?.id,
      startTime,
      endTime,
      tripDistance: commute?.distance
    })
    
    res.status(201).json(commute?.distance)
  } catch(err) {
    next(err)
  }
}

export default {
  getTripsForUser,
  getTotalDistanceForUser,
  getTripsBetweenDates,
  addTrip
}