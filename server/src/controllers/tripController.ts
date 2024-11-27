import { Response, Request, NextFunction } from "express"
import { Trip } from "../models/trip"
import { User } from "../models/user"
import { Op, WhereOptions } from "sequelize"
import { Commute } from "../models/commute"

export const getTripsForUser = async (req: Request<null, null, {uid: string, year?: string, month?: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.body.uid
    const { year, month } = req.query

    const user: User | null = await User.findOne({ where: { uid }})

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const whereCondition: WhereOptions = { userId: user.id }

    if (year) {
      if (typeof year !== "string")  {
        return res.status(400).json({ message: "Invalid date format" })
      }
      whereCondition.startTime = { [Op.gte]: `${year}-01-01 00:00:00` }
      whereCondition.endTime = { [Op.lte]: `${year}-12-31 23:59:59` }
    }

    if (year && month) {
      if (typeof month !== "string" || typeof year !== "string") {
        return res.status(400).json({ message: "Invalid date format" })
      }
  
      const formattedMonth = month.padStart(2, '0')

      const startOfMonth = `${year}-${formattedMonth}-01 00:00:00`

      const lastDay = new Date(parseInt(year), parseInt(formattedMonth), 0).getDate()
      const endOfMonth = `${year}-${formattedMonth}-${lastDay} 23:59:59`

      whereCondition.startTime = { [Op.gte]: startOfMonth }
      whereCondition.endTime = { [Op.lte]: endOfMonth }
    }

    const trips  = await Trip.findAll({ where: whereCondition })
    return res.status(200).json(trips)
  } catch (err) {
    return next(err)
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
  
export const getSumOfTripsBetweenDates = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
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

export const getTripsBetweenDates = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const uid = req.body.uid
    const { startTime, endTime } = req.query
    const user: User | null = await User.findOne({ where: { uid }})
    const trips  = await Trip.findAll({ where: { userId: user?.id, startTime: { [Op.gte]: startTime}, endTime: {[Op.lte]: endTime}}})
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

export const getTripsForAllUsers = async (req: Request<null, null, null>, res: Response, next: NextFunction) => {
  try {
    const { startTime, endTime } = req.query

    const trips = await Trip.count({
      distinct: true,
      col: 'userId',
      where: {
        startTime: {
          [Op.between]: [startTime, endTime]
        }
      }
    })
    res.status(200).json(trips)
  } catch(err) {
    next(err)
  }
}

export default {
  getTripsForUser,
  getTotalDistanceForUser,
  getTripsBetweenDates,
  addTrip,
  getSumOfTripsBetweenDates,
  getTripsForAllUsers
}