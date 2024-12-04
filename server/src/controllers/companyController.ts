import { Request, Response, NextFunction } from "express"
import { Company } from "../models/company"

export const getCompany = async (req: Request<null, null, {uid: string}>, res: Response, next: NextFunction) => {
  const companyId = req.companyId

  try {
    const company = await Company.findOne({where: { id: companyId }})
    if (!company) {
      return res.status(404).json({ message: "Company not found" })
    }


    res.status(200).json(company)
  } catch (err) {
    return next(err)
  }
}

export default {
  getCompany,
}