import { Request, Response, NextFunction } from "express"
import { Company } from "../models/company"
import { User } from "../models/user"
import { Company as CompanyType } from "../types"
import { getStatisticsForYear } from "../services/companyStatisticsService"

export const getCompany = async (req: Request<{ year: string }, null, {uid: string}>, res: Response, next: NextFunction) => {
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

export const getCompanyStatistics = async (req: Request<{ year: string }, null, {uid: string}>, res: Response, _next: NextFunction) => {
  const companyId = req.companyId
  const { year } = req.params

  const company = await Company.findOne({
    where: { id: companyId },
    include: [{ model: User, attributes: ['id'] }],
  })

  if (!year) {
    return res.status(400).json({ error: "Year is required (controller: companyController, getCompanyStatistics" })
  }

  if (!company) {
    return res.status(400).json({ error: "Company not found (controller: companyController, getCompanyStatistics" })
  }

  const plainCompany = company.get({ plain: true }) as CompanyType
  const employeeIds = plainCompany.users.map((user) => user.id)

  const { current, changes } = await getStatisticsForYear(employeeIds, year)

  const statistics = {
    company: {
      id: company.id,
      name: company.name,
    },
    current,
    changes,
  }

  return res.status(200).json(statistics)
}

export default {
  getCompany,
  getCompanyStatistics
}