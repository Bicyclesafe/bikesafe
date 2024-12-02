import { BarDatum } from "@nivo/bar"
import { createBarData, createPerDateData, createTotalData } from "../components/statistics/barChartHelper"
import { Trip } from "../types"

const trips: Trip[] = [
  {
    id: 1,
    userId: 1,
    tripDistance: 20,
    startTime: new Date(),
    endTime: new Date()
  },
  {
    id: 2,
    userId: 1,
    tripDistance: 50,
    startTime: new Date(),
    endTime: new Date()
  }
]

describe("barChartHelper module", () => {
  it("createBarData returns data in correct form", () => {
    const barData = createBarData(trips)
    expect(barData).toHaveLength(trips.length)
    expect(barData[0].time).toBe(trips[0].startTime)
    expect(barData[0].value).toBe(trips[0].tripDistance)
    expect(barData[1].time).toBe(trips[1].startTime)
    expect(barData[1].value).toBe(trips[1].tripDistance)
  })

  it("createPerDateData returns data in correct form", () => {
    const perDateData = createPerDateData(trips, 5)
    expect(perDateData).toHaveLength(trips.length)
    expect(perDateData[0].time).toBe(trips[0].startTime)
    expect(perDateData[0].value).toBe(trips[0].tripDistance * 5)
    expect(perDateData[1].time).toBe(trips[1].startTime)
    expect(perDateData[1].value).toBe(trips[1].tripDistance * 5)
  })

  it("createTotalData returns total data correctly", () => {
    const totalData = createTotalData(trips.map(trip => ({value: trip.tripDistance})))
    expect(totalData).toHaveLength(trips.length)
    expect(totalData[0].value).toBe(trips[0].tripDistance)
    expect(totalData[1].value).toBe(trips[0].tripDistance + trips[1].tripDistance)
  })

  it("createTotalData adds other parameters to output object", () => {
    const data = trips.map(trip => (
      {
        value: trip.tripDistance,
        monthNumber: 1,
        monthName: "Jan"
      }
    ))
    const totalData: BarDatum[] = createTotalData(data)
    expect(totalData[0].monthNumber).toBe(1)
  })
})