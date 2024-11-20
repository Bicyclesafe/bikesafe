import { render, screen, waitFor, fireEvent, getByText } from "@testing-library/react"
import Dashboard from "../components/dashboard/Dashboard"
import { getTripsBetweenDates } from "../services/tripService"
import { BrowserRouter } from "react-router-dom"

jest.mock("../services/tripService", () => ({
  getTripsBetweenDates: jest.fn(),
  addTrip: jest.fn(),
}))

jest.mock("../components/dashboard/PersonalGoalTracker", () => () => <div></div>)

jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn() } }),
}))

describe("Dashboard component", () => {
  it("updates the distance when button is pressed", async () => {
    const mockGetTripsBetweenDates = getTripsBetweenDates as jest.Mock

    mockGetTripsBetweenDates.mockResolvedValue(1)

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
})
