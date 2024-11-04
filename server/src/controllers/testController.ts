import { Response, Request, NextFunction } from "express"
import { auth } from "../util/firebaseConfig"

export const test = async (req: Request<null, null, {token: string}>, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body
      console.log(token)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const decodedToken = await auth.verifyIdToken(token)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(200).json(decodedToken.uid)
    } catch (err) {
      next(err)
    }
  }