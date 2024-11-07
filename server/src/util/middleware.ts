import { NextFunction, Request, Response } from "express"
import { auth } from "../util/firebaseConfig"

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.message)
  res.status(500).send({ errors: [{ message: "Something went wrong" }] })
}

export const tokenVerification = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const token = req.get("Authorization")?.split(" ")[1]
    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided" })
    }
    const decodedToken = await auth.verifyIdToken(token as string)
    req.body.uid = decodedToken.uid
    next()
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Token is invalid" })
    console.log(error)
  }
}