import { Op } from 'sequelize'
import { Trip } from '../models/trip'
import { User } from '../models/user'
import { endOfMonth, formatISO, startOfMonth } from 'date-fns'
import { emissionsCarPerKM } from './constants'

interface MonthData {
  month: number;
  short: number;
  medium: number;
  long: number;
}


const buildTripQuery = (employeeIds: number[], startTime: string, endTime: string) => ({
  where: {
    userId: { [Op.in]: employeeIds },
    startTime: { [Op.gte]: startTime },
    endTime: { [Op.lte]: endTime },
  },
})


const getMonthlyDistances = async (employeeIds: number[], year: string) => {
  const distancesByMonth = []

  for (let month = 1; month <= 12; month++) {
    const startTime = formatISO(startOfMonth(new Date(Number(year), month - 1)))
    const endTime = formatISO(endOfMonth(new Date(Number(year), month - 1)))
    const tripQuery = buildTripQuery(employeeIds, startTime, endTime)

    const distance = await Trip.sum('trip_distance', tripQuery)

    distancesByMonth.push({ month, distance })
  }

  return distancesByMonth
}


const getTripsByCategory = async (employeeIds: number[], year: string) => {
  const distancesByCategory: MonthData[] = []

  for (let month = 1; month <= 12; month++) {
    const startTime = formatISO(startOfMonth(new Date(Number(year), month - 1)))
    const endTime = formatISO(endOfMonth(new Date(Number(year), month - 1)))
    const tripQuery = buildTripQuery(employeeIds, startTime, endTime)

    const trips = await Trip.findAll(tripQuery)

    const monthData: MonthData = { month, short: 0, medium: 0, long: 0 }

    trips.forEach((trip) => {
      let category = ""
      if (trip.tripDistance >= 15) {
        category = 'long'
      } else if (trip.tripDistance >= 5) {
        category = 'medium'
      } else {
        category = 'short'
      }

      monthData[category as keyof MonthData]++
    })

    distancesByCategory.push(monthData)
  }

  return distancesByCategory
}


const getMonthlyActiveCyclists = async (employeeIds: number[], year: string) => {
  const activeCyclistsByMonth = []
  
  for (let month = 1; month <= 12; month++) {
    const startTime = formatISO(startOfMonth(new Date(Number(year), month - 1)))
    const endTime = formatISO(endOfMonth(new Date(Number(year), month - 1)))
    const tripQuery = buildTripQuery(employeeIds, startTime, endTime)

    const activeCyclists = await User.count({
      distinct: true,
      include: [{ model: Trip, ...tripQuery }],
    })

    activeCyclistsByMonth.push({ month, activeCyclists })
  }

  return activeCyclistsByMonth
}


export const getStatisticsForYear = async (employeeIds: number[], year: string) => {
  if (employeeIds.length === 0) {
    return {
      current: { totalDistance: 0, activeCyclists: 0, inactiveCyclists: 0 },
      changes: { distanceChange: 0, activeCyclistsChange: 0 }
    }
  }
  
  const [distancesByMonth, activeCyclistsByMonth, tripsByCategory] = await Promise.all([
    getMonthlyDistances(employeeIds, year),
    getMonthlyActiveCyclists(employeeIds, year),
    getTripsByCategory(employeeIds, year)
  ])

  const distancesWithCo2 = distancesByMonth.map((data) => ({
    ...data,
    co2SavedKg: data.distance * emissionsCarPerKM
  }))

  const yearlyTotalDistance = distancesByMonth.reduce((acc, curr) => acc + curr.distance, 0)

  return {
    distancesByMonth: distancesWithCo2,
    yearlyTotalDistance,
    tripsByCategory,
    activeCyclistsByMonth,
  }
}