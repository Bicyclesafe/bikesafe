import { render, screen, waitFor, fireEvent, act } from "@testing-library/react"
import PersonalGoalTracker from "../components/dashboard/PersonalGoalTracker"
import goalService from "../services/goalService"
import tripService from "../services/tripService"

jest.mock("../services/goalService", () => ({
  getCurrentGoalsForUser: jest.fn(),
  addGoal: jest.fn(),
}))

jest.mock("../services/tripService", () => ({
  getTripsBetweenDates: jest.fn(),
}))

jest.mock("@nivo/pie", () => ({
    ResponsivePie: () => <div data-testid="mock-responsive-pie">Mocked Pie Chart</div>
  }))

jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn(() => Promise.resolve("testToken")) } })
}))

describe("PersonalGoalTracker component", () => {
  const mockGetCurrentGoalsForUser = goalService.getCurrentGoalsForUser as jest.Mock
  const mockGetTripsBetweenDates = tripService.getTripsBetweenDates as jest.Mock
  const mockAddGoal = goalService.addGoal as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders progress data correctly when goals and progress are available", async () => {
    mockGetCurrentGoalsForUser.mockResolvedValue([{ goalDistance: 200, startTime: "2024-11-01", endTime: "2024-11-30" }])
    mockGetTripsBetweenDates.mockResolvedValue(150)

    render(<PersonalGoalTracker />)

    await waitFor(() => {
      expect(screen.getByText(/150 \/ 200/)).toBeInTheDocument()
    })
  })

  it("displays 'Set a personal goal for the week' when no goals are available", async () => {
    mockGetCurrentGoalsForUser.mockResolvedValue([])

    render(<PersonalGoalTracker />)

    await waitFor(() => {
      expect(screen.getByText(/Set a personal goal for the week/)).toBeInTheDocument()
    })
  })

  it("adds a new goal when the form is submitted", async () => {
    mockGetCurrentGoalsForUser.mockResolvedValueOnce([]).mockResolvedValueOnce([{ goalDistance: 100, startTime: "2024-11-01", endTime: "2024-11-30" }])
    mockAddGoal.mockResolvedValue({})

    render(<PersonalGoalTracker />)

    await waitFor(() => {
      expect(screen.getByText(/Set a personal goal for the week/)).toBeInTheDocument()
    })

    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/Enter your goal/), { target: { value: '100' } })
      fireEvent.click(screen.getByTestId("set-goal-button"))
    }) 
    
    expect(screen.getByTestId("progress-text")).toHaveTextContent("0 / 100") 
    
    await waitFor(() => {
      expect(mockAddGoal).toHaveBeenCalledWith("testToken", 100, expect.any(Date), expect.any(Date))
    })
  })

  it("handles errors when adding a new goal", async () => {
    mockGetCurrentGoalsForUser.mockResolvedValueOnce([])
    mockAddGoal.mockRejectedValue(new Error("Failed to add goal"))

    render(<PersonalGoalTracker />)

    await waitFor(() => {
      expect(screen.getByText(/Set a personal goal for the week/)).toBeInTheDocument()
    })

    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/Enter your goal/), { target: { value: '100' } })
      fireEvent.click(screen.getByTestId("set-goal-button"))
    })

    await waitFor(() => {
      expect(mockAddGoal).toHaveBeenCalledWith("testToken", 100, expect.any(Date), expect.any(Date))
      expect(screen.getByText(/Set a personal goal for the week/)).toBeInTheDocument()
    })
  })
})
