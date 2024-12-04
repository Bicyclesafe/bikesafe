import { useEffect, useState } from "react"
import companyService from "../../services/companyService"
import { useAuth } from "../../hooks/useAuth"
import stylesCompany from "./CompanyPage.module.css"
import ActivityPieChart from "./ActivityPieChart"
import EmissionsLineChart from "./EmissionsLineChart"
import EngagementBarChart from "./EngagementBarChart"

interface CompanyStatistics {
  company: {
    id: number
    name: string
  }
  current: {
    totalDistance: number
  }
  changes: {
    distanceChange: number
  }
}

const CompanyPage = () => {
  const [statistics, setStatistics] = useState<CompanyStatistics | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())

  const { user } = useAuth()

  useEffect(() => {
    const fetchCompany = async () => {
      if (user) {
        try {
          const token = await user.getIdToken(true)
          const statisticsResponse = await companyService.getCompanyStatistics(year, token as string)
          console.log(statisticsResponse)
          setStatistics(statisticsResponse)
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
  }, [user, year])

  const renderChange = (value: number | null) => {
    if (!value) {
      return <></>
    }
    const isPositive = value >= 0
  
    return (
      <span className={
        `${stylesCompany['activity-change']} ${isPositive
          ? stylesCompany['positive']
          : stylesCompany['negative']}`
      }>
        {value.toFixed(1)}%
      </span>
    )
  }

  if (loading) return <div>Loading...</div>
  if (!statistics?.company) return <div>You are not associated with a company.</div>

  return (
    <div className={stylesCompany['company-container']}>
      <div className={stylesCompany['company-content']}>
        <header>{statistics.company.name}</header>
        <select onChange={(e) => setYear(e.target.value)}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <div className={stylesCompany['company-statistics']}>
          <div className={stylesCompany['activity-left']}>
            <div className={stylesCompany['activity-title']}>Total Distance Cycled</div>
            <div className={stylesCompany['activity-value']}>{statistics.current.totalDistance}km</div>
            <div className={stylesCompany['activity-change']}>{renderChange(statistics.changes.distanceChange)}</div>
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