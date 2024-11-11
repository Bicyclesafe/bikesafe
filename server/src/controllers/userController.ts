import { Response, Request, NextFunction } from "express"
import { User } from "../models/user"

export const addUser = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const uid = req.body.uid
    const existingUser = await User.findOne({where: {uid}})
    if(!existingUser) {
        await User.create({ uid, role:"user" })
        res.status(201).json({ message: "User created succesfully"})
    }
    res.status(200).json({message: "User already exists"})
  } catch (err) {
    next(err)
  }
}

export default {
  addUser,
}