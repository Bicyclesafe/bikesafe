import { NextFunction, Request, Response } from "express"
import {getAppCheck} from 'firebase-admin/app-check'

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message)

  res.status(500).send({ errors: [{ message: "Something went wrong" }] })
}

export const appCheckVerification = async (req: Request, res: Response, next: NextFunction) => {
  const appCheckToken = req.header('X-Firebase-AppCheck')
  console.log(req.headers)

  if (!appCheckToken) {
    res.status(401)
    return next('Unauthorized')
  }

  try {
    const appCheckClaims = await getAppCheck().verifyToken(appCheckToken)
    console.log(appCheckClaims)
    return next()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(401)
    return next('Unauthorized')
  }
}