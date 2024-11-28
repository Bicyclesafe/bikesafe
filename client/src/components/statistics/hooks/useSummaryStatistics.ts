import { StatsDataProps, Trip } from "../../../types"
import { differenceInMilliseconds } from "date-fns"

const millisecondsToDuration = (milliseconds: number) => {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { hours, minutes }
}

const useSummaryStatistics = ( rawData: Trip[], year: string ): StatsDataProps | null => {
  if (!rawData || rawData.length === 0) return null

  const yearlyData = rawData.filter(
    (trip) => new Date(trip.startTime).getFullYear() === Number(year)
  )


  // Distance related calculations
  const yearlyTotalDistance = yearlyData.reduce((acc, trip) => {
        return acc + trip.tripDistance
    }, 0)

  const longestTripDistance = (() => {
    let maxDistance = 0

    yearlyData.forEach((trip) => {
      if (trip.tripDistance > maxDistance) {
        maxDistance = trip.tripDistance
      }
    })

    return maxDistance
  })()


  // Duration related calculations
  const yearlyTotalDuration = millisecondsToDuration(
    yearlyData.reduce((acc, trip) => {
      return acc + differenceInMilliseconds(trip.endTime, trip.startTime)
    }, 0))

  const yearlyAverageDuration = (() => {
    const averageInMinutes = (
      (yearlyTotalDuration.hours * 60 + yearlyTotalDuration.minutes) / yearlyData.length
    )

    const hours = Math.floor(averageInMinutes / 60)
    const minutes = Math.round(averageInMinutes % 60)

    return { hours, minutes }
  })()
  
  const yearlyAverageSpeed = yearlyTotalDistance / yearlyTotalDuration.hours

  const longestTripDuration = (() => {
    let maxDuration = 0

    yearlyData.forEach((trip) => {
      const difference = differenceInMilliseconds(trip.endTime, trip.startTime)
      if (difference > maxDuration) {
        maxDuration = difference
      }
    })

    return millisecondsToDuration(maxDuration)
  })()


  // Environment and health related calculations
  const yearlyCaloriesBurned = ((totalDistance: number, duration: { hours: number; minutes: number }) => {
    const totalHours = duration.hours + duration.minutes / 60
    if (totalHours === 0) return 0
  
    const averageSpeed = totalDistance / totalHours
    let caloriesPerHour
  
    if (averageSpeed < 16) {
      caloriesPerHour = 300
    } else if (averageSpeed < 20) {
      caloriesPerHour = 400
    } else {
      caloriesPerHour = 600
    }
  
    return caloriesPerHour * totalHours
  })(yearlyTotalDistance, yearlyTotalDuration)

  const co2EmissionsSaved = Number((258 * yearlyTotalDistance / 1000).toFixed(1))

  return {
    yearlyTotalDistance,
    longestTripDistance,
    yearlyTotalDuration,
    yearlyAverageDuration,
    yearlyAverageSpeed,
    longestTripDuration,
    yearlyCaloriesBurned,
    co2EmissionsSaved,
  }
}

export default useSummaryStatistics