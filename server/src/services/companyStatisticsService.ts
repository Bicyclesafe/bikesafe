import { Op } from 'sequelize'
import { Trip } from '../models/trip'

export const getTotalDistance = async (employeeIds: number[], startTime: string, endTime: string) => {
  return await Trip.sum('trip_distance', {
    where: {
      user_id: employeeIds,
      startTime: { [Op.gte]: startTime },
      endTime: { [Op.lte]: endTime },
    },
  })
}

export const getTotalTrips = async (employeeIds: number[], year: string) => {
  return await Trip.count({
    where: {
      user_id: employeeIds,
      startTime: { [Op.gte]: `${year}-01-01T00:00:00.000Z` },
      endTime: { [Op.lte]: `${year}-12-31T23:59:59.999Z` },
    },
  })
}

export const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

const getDateRangeForYear = (year: string, isCurrentYear: boolean) => {
  const currentDate = new Date()
  const startTime = `${year}-01-01T00:00:00.000Z`

  let endTime

  if (isCurrentYear) {
    const currentMonth = currentDate.getMonth() + 1
    const currentDay = currentDate.getDate()
    endTime = `${year}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}T23:59:59.999Z`
  } else {
    endTime = `${year}-12-31T23:59:59.999Z`
  }

  return { startTime, endTime }
}

export const getStatisticsForYear = async (employeeIds: number[], year: string) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear().toString()
  
  const isCurrentYear = year === currentYear

  const { startTime: currentStartDate, endTime: currentEndDate } = getDateRangeForYear(year, isCurrentYear)
  const previousYear = (Number(currentYear) - 1).toString()
  const { startTime: previousStartDate, endTime: previousEndDate } = getDateRangeForYear(previousYear, isCurrentYear)
  
  const currentTotalDistance = await getTotalDistance(employeeIds, currentStartDate, currentEndDate)
  const previousTotalDistance = await getTotalDistance(employeeIds, previousStartDate, previousEndDate)

  const distanceChange = calculatePercentageChange(currentTotalDistance, previousTotalDistance)

  return {
    current: {
      totalDistance: currentTotalDistance,
    },
    previous: {
      totalDistance: previousTotalDistance,
    },
    changes: {
      distanceChange,
    }
  }
}