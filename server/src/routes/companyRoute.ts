import express from "express"
import companyController from "../controllers/companyController"
import { getEmployerCompanyId } from "../util/middleware"

const router = express.Router()

router.get('/', getEmployerCompanyId, companyController.getCompany)

export default router