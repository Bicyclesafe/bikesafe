import { Duration, format, intervalToDuration } from "date-fns"
import stylesStatistics from "../statistics/StatisticsPage.module.css"
import { FC, useMemo } from "react"
import { Trip } from "../../types"

const LatestTrips : FC<{ rawData: Trip[]}> = ({ rawData = []})=> {
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
          <span className={stylesStatistics['unit']}>m</span>
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
    <div className={stylesStatistics['start-time']}>{format(startTime, 'HH:mm')}</div>
    <div className={stylesStatistics['details']}>
        <div>
        <span>{formatDuration(duration)}</span>
        </div>
        <div>
        <span className={stylesStatistics['distance']}>{Number(trip.tripDistance.toFixed(1))}</span>
        <span className={stylesStatistics['unit']}>km</span>
        </div>
        <div>
        <span className={stylesStatistics['co2']}>{((140 * trip.tripDistance) / 100).toFixed(0)}</span>
        <span className={stylesStatistics['unit']}>CO<sub>2</sub> (kg)</span>
        </div>
    </div>
    </div>
  )
  })

  return(
      <>
        {showLatestTrips}
      </>
  )
}

export default LatestTrips