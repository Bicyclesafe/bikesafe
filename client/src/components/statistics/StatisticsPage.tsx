import { useEffect, useMemo, useState } from "react"
import DistanceBarChart from "./DistanceBarChart"
import stylesStatistics from "./StatisticsPage.module.css"
import tripService from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { Trip } from "../../types"
import { Duration, format, intervalToDuration } from "date-fns"

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

  const formatDuration = (duration: Duration) => {
    const { hours = 0, minutes = 0 } = duration
  
    if (hours === 0) {
      return (
        <>
          <span className={stylesStatistics['duration']}>{minutes}</span>
          <span className={stylesStatistics['unit']}>min</span>
        </>
      )
    }

    if (minutes === 0) {
      return (
        <>
          <span className={stylesStatistics['duration']}>{hours}</span>
          <span className={stylesStatistics['unit']}>h</span>
        </>
      )
    }
    return (
      <>
        <span className={stylesStatistics['duration']}>{hours}</span>
        <span className={stylesStatistics['unit']}>h</span>
        <span style={{ marginLeft: "5px" }}>
          <span className={stylesStatistics['duration']}>{minutes}</span>
          <span className={stylesStatistics['unit']}>min</span>
        </span>
      </>
    )
  }

  const latestTrips = useMemo(() => {
    return rawData
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .slice(0, 5)
  }, [rawData])

  const showLatestTrips = latestTrips.map((trip) => {
    const startTime = new Date(trip.startTime)
    const duration = intervalToDuration({ start: trip.startTime, end: trip.endTime })

    return (
      <div className={stylesStatistics['trip-box']} key={trip.id}>
        <div className={stylesStatistics['date']}>{format(startTime, 'dd MMM yyyy')}</div>
        <div className={stylesStatistics['start-time']}>{format(startTime, 'h:mm')}</div>
        <div className={stylesStatistics['details']}>
          <span className={stylesStatistics['duration']}>{formatDuration(duration)}</span>
          <div>
            <span className={stylesStatistics['distance']}>{trip.tripDistance.toFixed(1)}</span>
            <span className={stylesStatistics['unit']}>km</span>
          </div>
          <div>
            <span className={stylesStatistics['co2']}>{((140 * trip.tripDistance) / 100).toFixed(0)}</span>
            <span className={stylesStatistics['unit']}>co2</span>
          </div>
        </div>
      </div>
    )
  })

  const yearlyTotalDistance = () => {
    // const filteredTrips = rawData.filter(
    //   (trip) => new Date(trip.startTime).getFullYear() === Number(year)
    // )

    return (
      <div>
        0km
      </div>
    )
  }

  return (
    <div className={stylesStatistics['statistics-container']}>
      <div className={stylesStatistics['statistics-content']}>
        <select onChange={(e) => setYear(e.target.value)}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
        <div className={stylesStatistics['chart']}>
            <DistanceBarChart rawData={rawData} year={year} />
        </div>
        <div className={stylesStatistics['item']}>
          <div className={stylesStatistics['item-title']}>
            General
          </div>
          {yearlyTotalDistance()}
        </div>
        <div className={stylesStatistics['item']}>
          <div className={stylesStatistics['item-title']}>
            Latest trips
          </div>
          {showLatestTrips}
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage