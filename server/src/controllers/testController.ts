import { Response, Request, NextFunction } from "express"
import { auth } from "../util/firebaseConfig"

export const test = async (req: Request<null, null, {data: string}>, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body
      console.log(data)
      const token = req.get("Authorization")?.split(" ")[1]
      if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" })
      }
      const decodedToken = await auth.verifyIdToken(token)
      return res.status(200).json(decodedToken.uid)
    } catch (err) {
      return next(err)
    }
  }