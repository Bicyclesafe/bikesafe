import { Response, Request, NextFunction } from "express"
import { User } from "../models/user"
import { UserAchievement } from "../models/userAchievement"


export const getAchievementsForUser = async (req: Request<null, null, {uid: string}>,
  res: Response, 
  next: NextFunction
) => {
  const { uid } = req.body
  try {
    
    const user: User | null = await User.findOne({ where: { uid }})

    if (!user) {
      res.status(404).json({ error: "User not found" })
      return 
    }

const achievements = await UserAchievement.findAll({ where: { userId: user?.id }})

    res.status(200).json(achievements)
  } catch(err) {
    next(err)
  }
}



export default {
  getAchievementsForUser,
}