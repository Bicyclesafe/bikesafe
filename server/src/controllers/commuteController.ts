import { Response, Request, NextFunction } from "express"
import { User } from "../models/user"
import { Commute } from "../models/commute"

export const addCommuteDistance = async (req: Request<null, null, {uid: string, distance: number}>, res: Response, next: NextFunction) => {
  try {
    const uid = req.body.uid
		const distance = req.body.distance
    const user: User | null = await User.findOne({ where: { uid }})

    if (!user) {
      res.status(404).json({ message: "User not found" })
    }

    const oldCommute = await Commute.findOne({ where: { user_id: user?.id }})

    if (oldCommute) {
      // If a commute exists, update it with the new distance
      oldCommute.distance = distance
      await oldCommute.save()
      res.status(200).json(oldCommute)
    } else {
      // If no commute record exists, create a new one
      const commute = await Commute.create({
        userId: user?.id,
        distance,
      })
      res.status(201).json(commute)
    }
  } catch (err) {
    next(err)
  }
}

export const getCommuteDistance = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const uid = req.body.uid
    const user: User | null = await User.findOne({ where: { uid }})
    const commute = await Commute.findOne({ where: { user_id: user?.id}})
    res.status(200).json(commute?.distance)
  } catch (err) {
    next(err)
  }
}

export default {
  addCommuteDistance,
	getCommuteDistance
}