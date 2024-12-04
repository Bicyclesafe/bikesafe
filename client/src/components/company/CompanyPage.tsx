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
    activeCyclists: number
    inactiveCyclists: number
  }
  changes: {
    distanceChange: number
    activeCyclistsChange: number
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
          console.log("statisticsResponse: ", statisticsResponse)
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

    if (isPositive) {
      return (
        <span className={`${stylesCompany['activity-change']} ${stylesCompany['positive']}`}>
          +{value.toFixed(1)}%
        </span>
      )
    }
  
    return (
      <span className={`${stylesCompany['activity-change']} ${stylesCompany['negative']}`}>
        -{Math.abs(Number(value.toFixed(1)))}%
      </span>
    )
  }

  const renderActiveCyclists = () => {
    if (!statistics) {
      return <span>0</span>
    }

    const totalCyclists = statistics.current.activeCyclists + statistics.current.inactiveCyclists
    const activePercentage = (statistics.current.activeCyclists / totalCyclists) * 100
    
    return (
      <span className={stylesCompany['activity-value']}>
        {statistics.current.activeCyclists}
        <span className={stylesCompany['unit']}>({activePercentage.toFixed(1)}%)</span>
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
            <div className={stylesCompany['activity-value']}>
              {statistics.current.totalDistance}
              <span className={stylesCompany['unit']}>km</span>
            </div>
            <div className={stylesCompany['activity-change']}>{renderChange(statistics.changes.distanceChange)}</div>
          </div>
          <div className={stylesCompany['activity-middle']}>
            <div className={stylesCompany['activity-title']}>Active cyclists</div>
            <div className={stylesCompany['activity-value']}>{renderActiveCyclists()}</div>
            <div className={stylesCompany['activity-change']}>{renderChange(statistics.changes.activeCyclistsChange)}</div>
          </div>
          <div className={stylesCompany['activity-right']}>
            <div className={stylesCompany['activity-title']}>Total CO2 saved</div>
            <div className={stylesCompany['activity-value']}>
              900
              <span className={stylesCompany['unit']}>kg</span>
            </div>
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