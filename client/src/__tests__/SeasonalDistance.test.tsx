import { render, screen, waitFor } from "@testing-library/react"
import SeasonalDistance from "../components/dashboard/SeasonalDistance"
import { getTripsBetweenDates } from "../services/tripService"


jest.mock("../services/tripService", () => ({
  getTripsBetweenDates: jest.fn()
}))

// Mockataan useAuth kokonaan, jotta se ei kutsu google_authentication.ts-tiedostoa
jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn() } }) // Määrittele mockattu käyttäjä
}))

describe("SeasonalDistance component", () => {
  const mockGetTripsBetweenDates = getTripsBetweenDates as jest.Mock
  it("renders distance data from tripService", async () => {
    mockGetTripsBetweenDates.mockResolvedValue(150)
    const setDistanceMock = jest.fn()

    render(<SeasonalDistance distance={150} setDistance={setDistanceMock} />)


    await waitFor(() => {
      expect(setDistanceMock).toHaveBeenCalledWith(150)
      expect(screen.getByText(/150km/)).toBeInTheDocument()
    })
  })

  it("displays 0km when no distance data is available", async () => {
    mockGetTripsBetweenDates.mockResolvedValue(0)
    const setDistanceMock = jest.fn()

    render(<SeasonalDistance distance={0} setDistance={setDistanceMock} />)


    await waitFor(() => {
      expect(setDistanceMock).toHaveBeenCalledWith(0)
      expect(screen.getByText(/0km/)).toBeInTheDocument()
    })
  })
})
