import { Trip } from "../../../types"
import { differenceInMilliseconds } from "date-fns"

const millisecondsToDuration = (milliseconds: number) => {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { hours, minutes }
}

const useSummaryStatistics = ( rawData: Trip[], year: string ) => {
  const yearlyData = rawData.filter(
    (trip) => new Date(trip.startTime).getFullYear() === Number(year)
  )

  const yearlyTotalDistance = yearlyData.reduce((acc, trip) => {
        return acc + trip.tripDistance
    }, 0)

  const yearlyTotalDuration = millisecondsToDuration(
    yearlyData.reduce((acc, trip) => {
      return acc + differenceInMilliseconds(trip.endTime, trip.startTime)
    }, 0))

  const longestTripDuration = (() => {
    let longestTrip = 0

    yearlyData.forEach((trip) => {
      const difference = differenceInMilliseconds(trip.endTime, trip.startTime)
      if (difference > longestTrip) {
        longestTrip = difference
      }
    })

    return millisecondsToDuration(longestTrip)
  })()

  const co2EmissionsSaved = Number((258 * yearlyTotalDistance / 1000).toFixed(1))

  return {
    yearlyTotalDistance,
    yearlyTotalDuration,
    longestTripDuration,
    co2EmissionsSaved
  }
}

export default useSummaryStatistics