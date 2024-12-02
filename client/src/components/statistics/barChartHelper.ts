import { BarDatum } from "@nivo/bar"
import { Trip } from "../../types"

export const createBarData = (trips: Trip[]) => {
  return trips.map(trip => ({time: trip.startTime, value: trip.tripDistance}))
}

export const createPerDateData = (trips: Trip[], valuePerKM: number) => {
  return trips.map(trip => ({time: trip.startTime, value: trip.tripDistance * valuePerKM}))
}

export const createTotalData = (data: BarDatum[]) => {
  const totalData = []
  let sum = 0
  for (let i = 0; i < data.length; i++) {
    sum += Number(data[i].value)
    totalData.push({...data[i], value: sum})
  }
  return totalData
}