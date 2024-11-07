import { Response, Request, NextFunction } from "express"
import { Goal } from "../models/goal"
import { User } from "../models/user"
import { Op } from "sequelize"

export const getGoalsForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params
    const user: User | null = await User.findOne({ where: { uid }})
    const goals: Goal[] = await Goal.findAll({ where: { userId: user?.id }})
    res.status(200).json(goals)
  } catch (err) {
    next(err)
  }
}

export const getCurrentGoalForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uid } = req.params
        const current_date = new Date()
        const user: User | null = await User.findOne({ where: { uid }})
        const goals: Goal[] = await Goal.findAll({ where: { userId: user?.id, startTime: { [Op.lte]: current_date}, endTime: {[Op.gte]:current_date}}})
        res.status(200).json(goals)
    } catch (err) {
        next(err)
    }
}

export default { getGoalsForUser, getCurrentGoalForUser }