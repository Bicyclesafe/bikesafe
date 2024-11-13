import { Response, Request, NextFunction } from "express"
import { Goal } from "../models/goal"
import { User } from "../models/user"
import { Op } from "sequelize"

export const getGoalsForUser = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const uid = req.body.uid
    const user: User | null = await User.findOne({ where: { uid }})
    const goals: Goal[] = await Goal.findAll({ where: { userId: user?.id }})
    res.status(200).json(goals)
  } catch (err) {
    return next(err)
  }
}

export const getCurrentGoalForUser = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
    try {
        const uid = req.body.uid
        const current_date = new Date()
        const user: User | null = await User.findOne({ where: { uid }})
        const goals: Goal[] = await Goal.findAll({ where: { userId: user?.id, startTime: { [Op.lte]: current_date}, endTime: {[Op.gte]:current_date}}})
        res.status(200).json(goals)
    } catch (err) {
        next(err)
    }
}

interface AddGoalRequestBody {
  uid: string;
  goal: number;
  startTime: Date;
  endTime: Date;
}

export const addGoal = async (req: Request<null, null, AddGoalRequestBody>, res: Response, next: NextFunction) => {
  try {
    const { uid, goal, startTime, endTime } = req.body
    const user: User | null = await User.findOne({ where: { uid }})
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const newGoal = await Goal.create({ userId: user.id, goal, startTime, endTime })
    return res.status(201).json(newGoal)
  } catch (err) {
    return next(err)
  }
}

export default { getGoalsForUser, getCurrentGoalForUser, addGoal }