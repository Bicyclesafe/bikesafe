import { render, screen, waitFor, fireEvent, getByText, act } from "@testing-library/react"
import Dashboard from "../components/dashboard/Dashboard"
<<<<<<< HEAD
import { getTripsBetweenDates, getAllTrips } from "../services/tripService"

jest.mock("../services/tripService", () => ({
  getTripsBetweenDates: jest.fn(),
	addTrip: jest.fn(),
  getAllTrips: jest.fn()
=======
import { getTripsBetweenDates } from "../services/tripService"
import { getCurrentGoalsForUser } from "../services/goalService"
import { BrowserRouter } from "react-router-dom"

jest.mock("../services/tripService", () => ({
  getTripsBetweenDates: jest.fn(),
  addTrip: jest.fn(),
}))

jest.mock("../services/goalService", () => ({
  getCurrentGoalsForUser: jest.fn(),
  addGoal: jest.fn()
>>>>>>> staging
}))

jest.mock("../components/dashboard/PersonalGoalTracker", () => () => <div></div>)

jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn() } }),
}))

describe("Dashboard component", () => {
  it("updates the distance when button is pressed", async () => {
    const mockGetTripsBetweenDates = getTripsBetweenDates as jest.Mock
    const mockGetAllTrips = getAllTrips as jest.Mock

<<<<<<< HEAD
    mockGetTripsBetweenDates.mockResolvedValue(1) 
    mockGetAllTrips.mockResolvedValue([])
=======
    mockGetTripsBetweenDates.mockResolvedValue(1)
>>>>>>> staging

    // Wrap the component in a Router
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    fireEvent.click(getByText(container, "Cycle to work"))

    await waitFor(() => {
      expect(mockGetTripsBetweenDates).toHaveBeenCalled()
      expect(screen.getByText(/1km/)).toBeInTheDocument()
    })
  })

  it("updates the goal progress when a trip is added", async () => {
    const mockGetTripsBetweenDates = getTripsBetweenDates as jest.Mock
    const mockGetCurrentGoalsForUser = getCurrentGoalsForUser as jest.Mock

    mockGetTripsBetweenDates.mockResolvedValue(1) 
    mockGetCurrentGoalsForUser.mockResolvedValue([{ goalDistance: 200, startTime: "2024-11-01", endTime: "2024-11-30" }])

    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    act (() => {
    fireEvent.click(getByText(container, 'Cycle to work'))
    })
    setTimeout(() => {
      expect(mockGetCurrentGoalsForUser).toHaveBeenCalled()
      expect(screen.getByText(/1\/200/)).toBeInTheDocument()  
  }, 1000)
  })
})
