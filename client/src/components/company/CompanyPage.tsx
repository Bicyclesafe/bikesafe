import { useEffect, useState } from "react"
import companyService from "../../services/companyService"
import { useAuth } from "../../hooks/useAuth"
import { Company } from "../../types"
import stylesCompany from "./CompanyPage.module.css"
import ActivityPieChart from "./ActivityPieChart"
import EmissionsLineChart from "./EmissionsLineChart"
import EngagementBarChart from "./EngagementBarChart"

const CompanyPage = () => {
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const { user } = useAuth()

  useEffect(() => {
    const fetchCompany = async () => {
      if (user) {
        try {
          const token = await user.getIdToken(true)
          const companyResponse = await companyService.getCompany(token as string)
          setCompany(companyResponse)
        } catch (error) {
          console.error('Error fetching company (Component: CompanyPage)', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    fetchCompany()
  }, [user])

  if (loading) return <div>Loading...</div>
  if (!company) return <div>You are not associated with a company.</div>

  return (
    <div className={stylesCompany['company-container']}>
      <div className={stylesCompany['company-content']}>
        <header>{company.name}</header>
        <div className={stylesCompany['company-statistics']}>
          <div className={stylesCompany['activity-left']}>
            <div className={stylesCompany['activity-title']}>Total Distance Cycled</div>
            <div className={stylesCompany['activity-value']}>542km</div>
            <div className={stylesCompany['activity-change']}>+15%</div>
          </div>
          <div className={stylesCompany['activity-middle']}>
            <div className={stylesCompany['activity-title']}>Active cyclists</div>
            <div className={stylesCompany['activity-value']}>69%</div>
            <div className={stylesCompany['activity-change']}>+2%</div>
          </div>
          <div className={stylesCompany['activity-right']}>
            <div className={stylesCompany['activity-title']}>Total CO2 saved</div>
            <div className={stylesCompany['activity-value']}>900kg</div>
            <div className={stylesCompany['activity-change']}>+15%</div>
          </div>
          <div className={stylesCompany['pie-chart']}>
            <ActivityPieChart />
          </div>
          <div className={stylesCompany['line-chart']}>
            <EmissionsLineChart />
          </div>
          <div className={stylesCompany['bar-chart']}>
            <EngagementBarChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyPage