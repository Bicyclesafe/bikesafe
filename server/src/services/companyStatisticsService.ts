import { Op } from 'sequelize'
import { Trip } from '../models/trip'
import { User } from '../models/user'
import { endOfMonth, formatISO, startOfMonth } from 'date-fns'

const buildTripQuery = (employeeIds: number[], startTime: string, endTime: string) => ({
  where: {
    userId: { [Op.in]: employeeIds },
    startTime: { [Op.gte]: startTime },
    endTime: { [Op.lte]: endTime },
  },
})


// const getTotalDistance = async (employeeIds: number[], startTime: string, endTime: string) => {
//   return await Trip.sum('trip_distance', {
//     where: {
//       user_id: employeeIds,
//       startTime: { [Op.gte]: startTime },
//       endTime: { [Op.lte]: endTime },
//     },
//   })
// }


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


// const calculatePercentageChange = (current: number, previous: number) => {
//   if (previous === 0) return 0
//   return ((current - previous) / previous) * 100
// }


// const getDateRangeForYear = (year: string, isCurrentYear: boolean) => {
//   const startTime = formatISO(startOfYear(new Date(Number(year), 0)))

//   const endTime = isCurrentYear
//     ? formatISO(new Date())
//     : formatISO(endOfYear(new Date(Number(year), 11)))

//   return { startTime, endTime }
// }


export const getStatisticsForYear = async (employeeIds: number[], year: string) => {
  if (employeeIds.length === 0) {
    return {
      current: { totalDistance: 0, activeCyclists: 0, inactiveCyclists: 0 },
      changes: { distanceChange: 0, activeCyclistsChange: 0 }
    }
  }
  
  const [distancesByMonth, activeCyclistsByMonth] = await Promise.all([
    getMonthlyDistances(employeeIds, year),
    getMonthlyActiveCyclists(employeeIds, year),
  ])

  const yearlyTotalDistance = distancesByMonth.reduce((acc, curr) => acc + curr.distance, 0)

  return {
    distancesByMonth,
    activeCyclistsByMonth,
    yearlyTotalDistance
  }
}