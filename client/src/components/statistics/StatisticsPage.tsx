import { useEffect, useMemo, useState } from "react"
import DistanceBarChart from "./DistanceBarChart"
import stylesStatistics from "./StatisticsPage.module.css"
import tripService from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { Trip } from "../../types"
import { format } from "date-fns"

const StatisticsPage = () => {
  const { user } = useAuth()
  const [rawData, setRawData] = useState<Trip[]>([])

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

  const latestTrips = useMemo(() => {
    return rawData
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .slice(0, 5)
  }, [rawData])

  const showLatestTrips = latestTrips.map((trip) => {
    const startTime = new Date(trip.startTime)
    return (
      <div className={stylesStatistics['row']} key={trip.id}>
        <div className={stylesStatistics['date']}>
          {format(startTime, 'dd MMM yyyy, hh:mm a')}
        </div>
        <div className={stylesStatistics['distance']}>
          {trip.tripDistance}km
        </div>
      </div>
    )
  })

  return (
    <div className={stylesStatistics['statistics-container']}>
      <div className={stylesStatistics['statistics-content']}>
        <div className={stylesStatistics['chart']}>
            <DistanceBarChart rawData={rawData} />
        </div>
        <div className={stylesStatistics['item']}>
          <div className={stylesStatistics['item-title']}>
            Latest trips
          </div>
          {showLatestTrips}
        </div>
        <div className={stylesStatistics['item']}>
          <div>hahaha</div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage