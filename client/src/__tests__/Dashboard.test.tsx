import { render, screen, waitFor, fireEvent, getByText, act } from "@testing-library/react"
import Dashboard from "../components/dashboard/Dashboard"
import { getTripsBetweenDates } from "../services/tripService"
import { getCurrentGoalsForUser } from "../services/goalService"

jest.mock("../services/tripService", () => ({
  getTripsBetweenDates: jest.fn(),
	addTrip: jest.fn()
}))

jest.mock("../services/goalService", () => ({
  getCurrentGoalsForUser: jest.fn(),
  addGoal: jest.fn()
}))

jest.mock("../components/dashboard/PersonalGoalTracker", () => () => <div></div>)

jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn() } })
}))

describe("Dashboard component", () => {
  it("updates the distance when button is pressed", async () => {
    const mockGetTripsBetweenDates = getTripsBetweenDates as jest.Mock

    mockGetTripsBetweenDates.mockResolvedValue(1) 

    const { container } = render(<Dashboard />)

    fireEvent.click(getByText(container, 'Cycle to work'))

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

    const { container } = render(<Dashboard />)
    act (() => {
    fireEvent.click(getByText(container, 'Cycle to work'))
    })
    setTimeout(() => {
      expect(mockGetCurrentGoalsForUser).toHaveBeenCalled()
      expect(screen.getByText(/1\/200/)).toBeInTheDocument()  
  }, 1000)
  })
})
