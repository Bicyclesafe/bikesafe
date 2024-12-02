import { render, screen, waitFor } from "@testing-library/react"
import TotalCommute from "../components/dashboard/TotalCommute"
import { getTripsForAllUsers } from "../services/tripService"

jest.mock("../services/tripService", () => ({
    getTripsForAllUsers: jest.fn()
}))

// Mockataan useAuth kokonaan, jotta se ei kutsu google_authentication.ts-tiedostoa
jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn() } }) // Määrittele mockattu käyttäjä
}))

describe("TotalCommute component", () => {
  const mockGetTripsForAllUsers = getTripsForAllUsers as jest.Mock

  it("displays 0 when no commutes have been cycled for the day", async () => {
    mockGetTripsForAllUsers.mockResolvedValue(0)
    render(<TotalCommute />)

    await waitFor(() => {
        expect(screen.getByTestId("commute-count").textContent).toBe("0")
      })
  })
})
