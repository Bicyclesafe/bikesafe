import { FC, useEffect, useState } from "react"
import { Trip } from "../../types"
import stylesSummary from "./SummaryStatistics.module.css"
import bicycleIcon from "../../assets/bicycle.svg"
import timerIcon from "../../assets/timer.svg"
import leafIcon from "../../assets/leaf.png"
import { differenceInMilliseconds, millisecondsToHours } from "date-fns"
import { StyledDuration } from "./LatestTrips"

interface StatisticProps {
  title: React.ReactNode
  value: React.ReactNode
  unit: string
  icon: string
  type: string
}

const Statistic: FC<StatisticProps> = ({
  title,
  value,
  unit,
  icon,
  type,
}) => {
  return (
    <div className={stylesSummary[`${type}-box`]}>
      <div> 
        {/* <a href="https://iconscout.com/icons/bicycle" class="text-underline font-size-sm" target="_blank">Bicycle</a> by <a href="https://iconscout.com/contributors/font-awesome" class="text-underline font-size-sm" target="_blank">Font Awesome</a> */}
        {/* <a href="https://iconscout.com/icons/timer" class="text-underline font-size-sm" target="_blank">Timer</a> by <a href="https://iconscout.com/contributors/taras-shypka" class="text-underline font-size-sm" target="_blank">Taras Shypka</a> */}
        <img src={icon}/>
        <span className={stylesSummary['title']}>{title}</span>
      </div>
      <div>
        <span className={stylesSummary['value']}>{value}</span>
        <span className={stylesSummary['unit']}>{unit}</span>
      </div>
    </div>
  )
}

const SummaryStatistics: FC<{ rawData: Trip[], year: string }> = ({ rawData, year })=> {
  const [yearlyData, setYearlyData] = useState<Trip[]>([])

  const getYearlyTotalDistance = () => {
    const sumOfDistance = yearlyData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.tripDistance
    }, 0)

    return sumOfDistance
  }

  const getYearlyTotalDuration = () => {
    const sumOfDuration = yearlyData.reduce((accumulator, currentValue) => {
      return accumulator + differenceInMilliseconds(currentValue.endTime, currentValue.startTime)
    }, 0)

    return millisecondsToHours(sumOfDuration)
  }

  const getLongestTripDuration = () => {
    let longestTrip = 0

    yearlyData.forEach((trip) => {
      const difference = differenceInMilliseconds(trip.endTime, trip.startTime)
      if (difference > longestTrip) {
        longestTrip = difference
      }
    })

    const totalMinutes = Math.floor(longestTrip / (1000 * 60))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return { hours, minutes }
  }

  const yearlyTotalDistance = Number(getYearlyTotalDistance().toFixed(1))
  const yearlyTotalDuration = getYearlyTotalDuration()
  const longestTripDuration = getLongestTripDuration()

  useEffect(() => {
      const filteredTrips = rawData.filter(
        (trip) => new Date(trip.startTime).getFullYear() === Number(year)
      )
      setYearlyData(filteredTrips)
  }, [rawData, year])

  return (
    <div className={stylesSummary['summary-box']}>
      <Statistic
        title="Cycled This Year"
        value={yearlyTotalDistance}
        unit="km"
        icon={bicycleIcon}
        type="distance"
      />
      <Statistic
        title="Longest Ride by Time"
        value={<StyledDuration duration={longestTripDuration} />}
        unit=""
        icon={timerIcon}
        type="time"
      />
      <Statistic
        title="Hours Cycled"
        value={yearlyTotalDuration}
        unit="h"
        icon={timerIcon}
        type="time"
      />
      <Statistic
        title={
          <>
            CO<sub>2</sub> Emissions Saved
          </>
        }
        value={Number((258 * yearlyTotalDistance / 1000).toFixed(1))}
        unit="kg"
        icon={leafIcon}
        type="emission"
      />
    </div>
  )
}

export default SummaryStatistics