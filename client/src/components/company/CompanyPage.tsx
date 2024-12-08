import { useEffect, useState } from "react"
import companyService from "../../services/companyService"
import { useAuth } from "../../hooks/useAuth"
import stylesCompany from "./CompanyPage.module.css"
import ActivityPieChart from "./ActivityPieChart"
import EmissionsLineChart from "./EmissionsLineChart"
import YearMonthPicker from "./util/YearMonthPicker"
import useStatisticsData from "./hooks/useStatisticsData"
import ActivityMetric from "./ActivityMetric"
import ActivityLineChart from "./ActivityLineChart"
import { CompanyStatistics } from "../../types"
import { getActivityLineChartData, getEmissionLineChartData, getPieChartDataForMonth } from "./util/dataTransformations"


const CompanyPage = () => {
  const currentDate = new Date()
  const defaultDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

  const [statistics, setStatistics] = useState<CompanyStatistics | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate)
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())

  const { user } = useAuth()

  const {
    currentMonthDistance,
    previousMonthDistance,
    currentMonthCyclists,
    previousMonthCyclists,
    currentCO2,
    previousCO2,
  } = useStatisticsData(statistics, selectedDate)

  useEffect(() => {
    const fetchCompanyStatistics = async () => {
      if (user) {
        setLoading(true)
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
    fetchCompanyStatistics()
  }, [user, year])

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate)
    if (newDate) {
      const newYear = newDate.getFullYear().toString()
      if (newYear !== year) {
        setYear(newYear)
      }
    }
  }

  if (loading) return <div>Loading...</div>
  if (!statistics?.company) return <div>You are not associated with a company.</div>

  return (
    <div className={stylesCompany['company-container']}>
      <div className={stylesCompany['company-content']}>
        <div className={stylesCompany['company-date']}>
          <header>{statistics.company.name}</header>
          <YearMonthPicker value={selectedDate} onChange={handleDateChange} />
        </div>
        {selectedDate && (
          <div className={stylesCompany['company-statistics']}>

            <div className={stylesCompany['activity-left']}>
              <ActivityMetric
                title="Total Distance Cycled"
                currentValue={currentMonthDistance}
                previousValue={previousMonthDistance}
                unit="km"
              />
            </div>

            <div className={stylesCompany['activity-middle']}>
              <ActivityMetric
                title="Active Cyclists"
                currentValue={currentMonthCyclists}
                previousValue={previousMonthCyclists}
                unit=""
              />
            </div>

            <div className={stylesCompany['activity-right']}>
              <ActivityMetric
                title="Total CO2 Saved"
                currentValue={currentCO2}
                previousValue={previousCO2}
                unit="kg"
              />
            </div>

            <div className={stylesCompany['pie-chart']}>
              <ActivityPieChart
                data={getPieChartDataForMonth(selectedDate.getMonth(), statistics.tripsByCategory)}
              />
            </div>
            <div className={stylesCompany['line-chart']}>
              <EmissionsLineChart data={getEmissionLineChartData(year, statistics.distancesByMonth)} />
            </div>
            <div className={stylesCompany['line-chart']}>
              <ActivityLineChart data={getActivityLineChartData(year, statistics.activeCyclistsByMonth)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanyPage