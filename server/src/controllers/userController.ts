import { Response, Request, NextFunction } from "express"
import { User } from "../models/user"

export const addUser = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const uid = req.body.uid
    const existingUser = await User.findOne({where: {uid}})
    if(!existingUser) {
        await User.create({ uid, role:"user" })
        res.status(201)
    }
    res.status(200)
  } catch (err) {
    next(err)
  }
}

export default {
  addUser,
}