import { Duration, format, intervalToDuration } from "date-fns"
import stylesLatestTrips from "./LatestTripsDashboard.module.css"
import { FC, useMemo } from "react"
import { Trip } from "../../types"

export const StyledDuration: FC<{ duration: Duration }> = ({ duration }) => {
  const { hours = 0, minutes = 0 } = duration

  if (hours === 0) {
    return (
      <>
        <span className={stylesLatestTrips['duration']}>{minutes}</span>
        <span className={stylesLatestTrips['unit']}>min</span>
      </>
    )
  }

  if (minutes === 0) {
    return (
      <>
        <span className={stylesLatestTrips['duration']}>{hours}</span>
        <span className={stylesLatestTrips['unit']}>h</span>
      </>
    )
  }
  return (
    <>
      <span className={stylesLatestTrips['duration']}>{hours}</span>
      <span className={stylesLatestTrips['unit']}>h</span>
      <span style={{ marginLeft: "5px" }}>
        <span className={stylesLatestTrips['duration']}>{minutes}</span>
        <span className={stylesLatestTrips['unit']}>m</span>
      </span>
    </>
  )
}

const LatestTripsDashboard : FC<{ rawData: Trip[] }> = ({ rawData })=> {
  const latestTrips = useMemo(() => {
    return rawData
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .slice(0, 5)
  }, [rawData])
  
  const showLatestTrips = latestTrips.map((trip) => {
    const startTime = new Date(trip.startTime)
    const duration = intervalToDuration({ start: trip.startTime, end: trip.endTime })

    return (
      <div className={stylesLatestTrips['trip']} key={trip.id} data-testid="trip">
        <div className={stylesLatestTrips['date']}>
          <span>{format(startTime, 'dd MMM yyyy')}</span>
          <span>{format(startTime, 'HH:mm')}</span>
        </div>
        <div className={stylesLatestTrips['details']}>
          <div>
            <StyledDuration duration={duration} />
          </div>
          <div>
            <span className={stylesLatestTrips['distance']}>{Number(trip.tripDistance.toFixed(1))}</span>
            <span className={stylesLatestTrips['unit']}>km</span>
          </div>
          <div>
            <span className={stylesLatestTrips['co2']}>{((258 * trip.tripDistance) / 1000).toFixed(0)}</span>
            <span className={stylesLatestTrips['unit']}>CO<sub>2</sub> kg</span>
          </div>
        </div>
      </div>
    )
  })

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return (
      <div className={stylesLatestTrips['latest-trips-container']}>
        <div className={stylesLatestTrips['text-container']}>
          <header className={stylesLatestTrips['header']}>
            Latest trips
          </header>
          <div>
            No trips found
          </div>
        </div>
      </div>
    )
  }

  return(
    <div className={stylesLatestTrips['latest-trips-container']}>
        <header>Latest trips</header>
        {showLatestTrips}
      </div>
  )
}

export default LatestTripsDashboard