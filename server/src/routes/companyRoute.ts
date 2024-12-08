import express from "express"
import companyController from "../controllers/companyController"
import { getEmployerCompanyId } from "../util/middleware"

const router = express.Router()

router.get('/', getEmployerCompanyId, companyController.getCompany)
router.get('/:year', getEmployerCompanyId, companyController.getCompanyStatistics)

export default router