import { format } from "date-fns"
import { TripCategoryCounts, TripsByMonth } from "../../../types"

export const getPieChartDataForMonth = (month: number, tripsByCategory: TripsByMonth) => {
  const monthData: TripCategoryCounts = tripsByCategory[month] || { short: 0, medium: 0, long: 0 }
  return [
    { id: 'short', value: monthData.short },
    { id: 'medium', value: monthData.medium },
    { id: 'long', value: monthData.long },
  ]
}

export const getActivityLineChartData = (year: string, activeCyclistsByMonth: { month: number, activeCyclists: number }[]) => {
  const data = activeCyclistsByMonth.map((data) => {
    const dateString = format(new Date(Number(year), data.month - 1, 1), 'yyyy-MM-dd')
    return {
      x: dateString,
      y: data.activeCyclists
    }
  })

  return [{ id: "activity", data }]
}

export const getEmissionLineChartData = (year: string, distancesByMonth: { month: number, distance: number, co2SavedKg: number }[]) => {
  let cumulativeCo2 = 0
  const data = distancesByMonth.map((data) => {
    cumulativeCo2 += data.co2SavedKg
    const dateString = format(new Date(Number(year), data.month - 1, 1), 'yyyy-MM-dd')
    return {
      x: dateString,
      y: cumulativeCo2
    }
  })

  return [{ id: "emissions", data }]
}