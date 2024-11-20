import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import DistanceBarChart from "../components/statistics/DistanceBarChart"
import tripService from "../services/tripService"

jest.mock("../services/tripService", () => ({
  getAllTrips: jest.fn(),
}))

jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { getIdToken: jest.fn(() => Promise.resolve("mockToken")) } }),
}))

jest.mock("@nivo/bar", () => ({
    ResponsiveBar: jest.fn(() => <div data-testid="nivo-bar-chart">Mock Chart</div>),
  }))
  

describe("DistanceBarChart component", () => {
  it("renders the chart with initial yearly data", async () => {
    const mockGetAllTrips = tripService.getAllTrips as jest.Mock
    mockGetAllTrips.mockResolvedValue([
      { startTime: new Date(2024, 0, 1), tripDistance: 100 },
      { startTime: new Date(2024, 1, 1), tripDistance: 200 },
    ])

    render(<DistanceBarChart />)

    await waitFor(() => {
      expect(mockGetAllTrips).toHaveBeenCalledWith("mockToken", "2024", null)
      expect(screen.getByTestId("nivo-bar-chart")).toBeInTheDocument()

    })
  })

  it.skip("updates the chart when a year is selected", async () => {
    const mockGetAllTrips = tripService.getAllTrips as jest.Mock
    mockGetAllTrips.mockResolvedValueOnce([
      { startTime: new Date(2024, 0, 1), tripDistance: 150 },
    ])

    render(<DistanceBarChart />)

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2024" } })

    await waitFor(() => {
      expect(mockGetAllTrips).toHaveBeenCalledWith("mockToken", "2024", null)
      expect(screen.getByText(/January/)).toBeInTheDocument()
    })
  })

  it.skip("switches to daily view when a bar is clicked", async () => {
    const mockGetAllTrips = tripService.getAllTrips as jest.Mock
    mockGetAllTrips.mockResolvedValue([
      { startTime: new Date(2023, 0, 1), tripDistance: 100 },
    ])

    render(<DistanceBarChart />)

    await waitFor(() => {
      const barElement = screen.getByText(/January/)
      fireEvent.click(barElement)
    })

    await waitFor(() => {
      expect(mockGetAllTrips).toHaveBeenCalledWith("mockToken", "2023", "1")
      expect(screen.getByText(/Day/)).toBeInTheDocument()
    })
  })

  it.skip("returns to yearly view when the back button is clicked", async () => {
    const mockGetAllTrips = tripService.getAllTrips as jest.Mock
    mockGetAllTrips.mockResolvedValue([
      { startTime: new Date(2023, 0, 1), tripDistance: 100 },
    ])

    render(<DistanceBarChart />)

    await waitFor(() => {
      const barElement = screen.getByText(/January/)
      fireEvent.click(barElement)
    })

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Return to yearly view/))
      expect(mockGetAllTrips).toHaveBeenCalledWith("mockToken", "2023", null)
      expect(screen.getByText(/January/)).toBeInTheDocument()
    })
  })

  it.skip("handles errors from the trip service gracefully", async () => {
    const mockGetAllTrips = tripService.getAllTrips as jest.Mock
    mockGetAllTrips.mockRejectedValue(new Error("Failed to fetch"))

    render(<DistanceBarChart />)

    await waitFor(() => {
      expect(mockGetAllTrips).toHaveBeenCalled()
      expect(screen.queryByText(/January/)).not.toBeInTheDocument()
    })
  })
})
