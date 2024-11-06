import { render, screen, waitFor } from "@testing-library/react"
import SeasonalDistance from "../components/dashboard/SeasonalDistance"
import { getTotalDistanceForUser } from "../services/tripService"


jest.mock("../services/tripService", () => ({
    getTotalDistanceForUser: jest.fn(),
  }))

// Mockataan useAuth kokonaan, jotta se ei kutsu google_authentication.ts-tiedostoa
jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId" } }) // Määrittele mockattu käyttäjä
}))

describe("SeasonalDistance component", () => {
  const mockGetTotalDistanceForUser = getTotalDistanceForUser as jest.Mock
  it("renders distance data from tripService", async () => {
    mockGetTotalDistanceForUser.mockResolvedValue(150)

    render(<SeasonalDistance />)

    await waitFor(() => {
      expect(screen.getByText(/150km/)).toBeInTheDocument()
    })
  })

  it("displays 0km when no distance data is available", async () => {
    mockGetTotalDistanceForUser.mockResolvedValue(0)

    render(<SeasonalDistance />)

    await waitFor(() => {
      expect(screen.getByText(/0km/)).toBeInTheDocument()
    })
  })
})
