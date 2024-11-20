import { render, screen, waitFor, fireEvent, getByText } from "@testing-library/react"
import Dashboard from "../components/dashboard/Dashboard"
import { getTripsBetweenDates, getAllTrips } from "../services/tripService"

jest.mock("../services/tripService", () => ({
  getTripsBetweenDates: jest.fn(),
	addTrip: jest.fn(),
  getAllTrips: jest.fn()
}))

jest.mock("../components/dashboard/PersonalGoalTracker", () => () => <div></div>)

jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn() } })
}))

describe("Dashboard component", () => {
  it("updates the distance when button is pressed", async () => {
    const mockGetTripsBetweenDates = getTripsBetweenDates as jest.Mock
    const mockGetAllTrips = getAllTrips as jest.Mock

    mockGetTripsBetweenDates.mockResolvedValue(1) 
    mockGetAllTrips.mockResolvedValue([])

    const { container } = render(<Dashboard />)

    fireEvent.click(getByText(container, 'Cycle to work'))

    await waitFor(() => {
      expect(mockGetTripsBetweenDates).toHaveBeenCalled()  
      expect(screen.getByText(/1km/)).toBeInTheDocument()  
    })
  })
})
