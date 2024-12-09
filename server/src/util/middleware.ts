import { NextFunction, Request, Response } from "express"
import { auth } from "../util/firebaseConfig"
import { User } from "../models/user"
import { Company } from "../models/company"

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.message)
  res.status(500).send({ errors: [{ message: "Something went wrong" }] })
}

export const tokenVerification = async (req: Request<{ year: string }, null, {uid: string}>, res: Response, next: NextFunction) => {
  try {
    const token = req.get("Authorization")?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" })
    }
    const decodedToken = await auth.verifyIdToken(token)
    req.body.uid = decodedToken.uid
    return next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: "Unauthorized: Token is invalid" })
  }
}

export const getEmployerCompanyId = async (req: Request<{ year: string }, null, {uid: string}>, res: Response, next: NextFunction) => {
  const { uid } = req.body

  try {
    const user = await User.findOne({ where: { uid } })
    if (!user || user.role !== 'employer') {
      return res.status(403).json({ error: 'Forbidden: You are not an employer' })
    }

    const company = await Company.findOne({ where: { id: user.companyId } })
    if (!company) {
      return res.status(404).json({ error: 'No company associated with this employer' })
    }

    req.companyId = company.id

    return next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}