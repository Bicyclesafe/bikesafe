import { useEffect, useState } from "react"
import DistanceBarChart from "./DistanceBarChart"
import stylesStatistics from "./StatisticsPage.module.css"
import tripService from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { Trip } from "../../types"
import LatestTrips from "./LatestTrips"
import SummaryStatistics from "./SummaryStatistics"

const StatisticsPage = () => {
  const { user } = useAuth()
  const [rawData, setRawData] = useState<Trip[]>([])
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())


  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken(true)
        const trips = await tripService.getAllTrips(token as string)
        setRawData(trips)
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }
    fetchData()
  }, [user])

  return (
    <div className={stylesStatistics['statistics-container']}>
      <select onChange={(e) => setYear(e.target.value)}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
      <div className={stylesStatistics['statistics-content']}>
        <div className={stylesStatistics['chart']}>
            <DistanceBarChart rawData={rawData} year={year} />
        </div>
        <div className={stylesStatistics['summary-container']}>
          <div className={stylesStatistics['summary-container-title']}>
            Summary
          </div>
          <SummaryStatistics rawData={rawData} year={year} />
        </div>
        <div className={stylesStatistics['trip-container']}>
          <div className={stylesStatistics['trip-container-title']}>
            Latest trips
          </div>
          <LatestTrips rawData={rawData} />
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage