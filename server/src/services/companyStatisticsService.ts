import { Op } from 'sequelize'
import { Trip } from '../models/trip'

export const getTotalDistance = async (employeeIds: number[], year: string) => {
  return await Trip.sum('trip_distance', {
    where: {
      user_id: employeeIds,
      startTime: { [Op.gte]: `${year}-01-01T00:00:00.000Z` },
      endTime: { [Op.lte]: `${year}-12-31T23:59:59.999Z` },
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

export const getStatisticsForYear = async (employeeIds: number[], currentYear: string, previousYear: string) => {
  const currentTotalDistance = await getTotalDistance(employeeIds, currentYear)
  const previousTotalDistance = await getTotalDistance(employeeIds, previousYear)

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