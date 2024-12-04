import { Op } from 'sequelize'
import { Trip } from '../models/trip'
import { User } from '../models/user'

const getTotalDistance = async (employeeIds: number[], startTime: string, endTime: string) => {
  return await Trip.sum('trip_distance', {
    where: {
      user_id: employeeIds,
      startTime: { [Op.gte]: startTime },
      endTime: { [Op.lte]: endTime },
    },
  })
}

const getActiveCyclistsInRange = async (employeeIds: number[], startTime: string, endTime: string) => {
  const [activeCyclists, inactiveCyclists] = await Promise.all([
    User.findAll({
      include: [{
        model: Trip,
        where: {
          userId: employeeIds,
          startTime: { [Op.gte]: startTime },
          endTime: { [Op.lte]: endTime },
        },
        attributes: [],
      }]
    }),
    User.findAll({
      include: [{
        model: Trip,
        required: false,
        attributes: [],
        where: {
          userId: employeeIds,
          startTime: { [Op.gte]: startTime },
          endTime: { [Op.lte]: endTime },
        }
      }],
      where: {
        id: employeeIds,
        '$trips.id$': null,
      },
    })
  ])

  const activeCyclistCount = activeCyclists.length
  const inactiveCyclistCount = inactiveCyclists.length

  return { activeCyclistCount, inactiveCyclistCount }
}

const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return 0
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
  if (employeeIds.length === 0) {
    return {
      current: { totalDistance: 0, activeCyclists: 0, inactiveCyclists: 0 },
      changes: { distanceChange: 0, activeCyclistsChange: 0 }
    }
  }

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear().toString()
  const isCurrentYear = year === currentYear

  const { current, previous } = {
    current: getDateRangeForYear(year, isCurrentYear),
    previous: getDateRangeForYear((parseInt(year, 10) - 1).toString(), false)
  }
  
  const [currentDistances, previousDistances, currentStats, previousStats] = await Promise.all([
    getTotalDistance(employeeIds, current.startTime, current.endTime),
    getTotalDistance(employeeIds, previous.startTime, previous.endTime),
    getActiveCyclistsInRange(employeeIds, current.startTime, current.endTime),
    getActiveCyclistsInRange(employeeIds, previous.startTime, previous.endTime),
  ])

  const distanceChange = calculatePercentageChange(currentDistances, previousDistances)
  const activeCyclistsChange = calculatePercentageChange(currentStats.activeCyclistCount, previousStats.activeCyclistCount)

  return {
    current: {
      totalDistance: currentDistances,
      activeCyclists: currentStats.activeCyclistCount,
      inactiveCyclists: currentStats.inactiveCyclistCount,
    },
    changes: {
      distanceChange,
      activeCyclistsChange,
    }
  }
}