import { Response, Request, NextFunction } from "express"
import { User } from "../models/user"

export const addUser = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const uid = req.body.uid
    const existingUser = await User.findOne({where: {uid}})
    if(!existingUser) {
      await User.create({ uid, role:"user" })
      res.status(201).json({ message: "User created succesfully"})
    } else {
      res.status(200).json({ message: "User already exists"})
    }
  } catch (err) {
    next(err)
  }
}

export const getUserRole = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  const { uid } = req.body

  try {
    const user = await User.findOne({where: {uid}})
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }


    res.status(200).json(user.role)
  } catch (err) {
    return next(err)
  }
}

export default {
  addUser,
  getUserRole
}