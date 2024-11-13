import { render, screen, waitFor } from "@testing-library/react"
import PersonalGoalTracker from "../components/dashboard/PersonalGoalTracker"
import goalService from "../services/goalService"
import tripService from "../services/tripService"

jest.mock("../services/goalService", () => ({
  getCurrentGoalsForUser: jest.fn(),
}))

jest.mock("../services/tripService", () => ({
  getTripsBetweenDates: jest.fn(),
}))

jest.mock("@nivo/pie", () => ({
    ResponsivePie: () => <div data-testid="mock-responsive-pie">Mocked Pie Chart</div>
  }))

// Mock useAuth to prevent calls to google_authentication.ts
jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn(() => Promise.resolve("testToken")) } })
}))

describe("PersonalGoalTracker component", () => {
  const mockGetCurrentGoalsForUser = goalService.getCurrentGoalsForUser as jest.Mock
  const mockGetTripsBetweenDates = tripService.getTripsBetweenDates as jest.Mock

  it("renders progress data correctly when goals and progress are available", async () => {
    mockGetCurrentGoalsForUser.mockResolvedValue([{ goalDistance: 200, startTime: "2024-11-01", endTime: "2024-11-30" }])
    mockGetTripsBetweenDates.mockResolvedValue(150)

    render(<PersonalGoalTracker />)

    await waitFor(() => {
      expect(screen.getByText(/150 \/ 200/)).toBeInTheDocument()
    })
  })

  it("displays 'No personal goals yet' when no goals are available", async () => {
    mockGetCurrentGoalsForUser.mockResolvedValue([])

    render(<PersonalGoalTracker />)

    await waitFor(() => {
      expect(screen.getByText(/No personal goals yet/)).toBeInTheDocument()
    })
  })
})
