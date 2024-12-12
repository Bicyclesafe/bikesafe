import { render, screen } from "@testing-library/react"
import LatestTrips from "../components/statistics/LatestTrips"
import { format, intervalToDuration } from "date-fns"

describe("LatestTrips component", () => {
  const rawData = [
    {
      id: 1,
      userId: 1,
      startTime: new Date('2024-01-15 06:00:00'),
      endTime: new Date('2024-01-15 06:41:00'),
      tripDistance: 10
    },
    {
      id: 2,
      userId: 1,
      startTime: new Date('2024-01-15 06:00:00'),
      endTime: new Date('2024-01-15 06:42:00'),
      tripDistance: 15
    },
    {
      id: 3,
      userId: 1,
      startTime: new Date('2024-01-15 06:00:00'),
      endTime: new Date('2024-01-15 07:00:00'),
      tripDistance: 1
    },
    {
      id: 4,
      userId: 1,
      startTime: new Date('2024-07-01 13:00:00'),
      endTime: new Date('2024-07-01 14:30:00'),
      tripDistance: 30
    },
    {
      id: 5,
      userId: 1,
      startTime: new Date('2023-05-01 13:00:00'),
      endTime: new Date('2023-05-01 14:30:00'),
      tripDistance: 22
    }
  ]

  it("renders the correct number of trips", () => {
    render(<LatestTrips rawData={rawData} />)
    const trips = screen.getAllByTestId("trip")

    expect(trips).toHaveLength(3)
  })

  it("no trips are rendered if rawData is empty", () => {
    render(<LatestTrips rawData={[]} />)
    const trips = screen.queryAllByTestId("trip")

    expect(trips).toHaveLength(0)
  })

  it("renders all trips with correct data", () => {
    render(<LatestTrips rawData={rawData} />)
    const trips = screen.getAllByTestId("trip")

    trips.forEach((trip, index) => {
      const tripData = rawData[index]

      expect(trip).toHaveTextContent(format(new Date(tripData.startTime), 'dd MMM yyyy'))
      expect(trip).toHaveTextContent(format(new Date(tripData.startTime), 'HH:mm'))

      const duration = intervalToDuration({ start: new Date(tripData.startTime), end: new Date(tripData.endTime) })
      const hours = duration.hours || 0
      const minutes = duration.minutes || 0

      if (hours > 0) expect(trip).toHaveTextContent(`${hours}h`)
      if (minutes > 0) expect(trip).toHaveTextContent(`${minutes}m`)

      expect(trip).toHaveTextContent(`${Number(tripData.tripDistance.toFixed(1))}km`)

      const co2 = ((258 * tripData.tripDistance) / 1000).toFixed(0)

      expect(trip).toHaveTextContent(`${co2}CO2 kg`)
    })
  })

  it("trips are sorted correctly", () => {
    render(<LatestTrips rawData={rawData} />)
    const sortedTrips = [...rawData].sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    const trips = screen.getAllByTestId("trip")

    trips.forEach((trip, index) => {
      const tripData = sortedTrips[index]

      expect(trip).toHaveTextContent(format(new Date(tripData.startTime), 'dd MMM yyyy'))
      expect(trip).toHaveTextContent(format(new Date(tripData.startTime), 'HH:mm'))
    })
  })
})