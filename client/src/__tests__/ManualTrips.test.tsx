import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { addTrip } from "../services/tripService"
import ManualTrips from "../components/dashboard/ManualTrips"

jest.mock("../services/tripService", () => ({
    addTrip: jest.fn()
}))

// Mockataan useAuth kokonaan, jotta se ei kutsu google_authentication.ts-tiedostoa
jest.mock("../hooks/useAuth", () => ({
    useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn(() => Promise.resolve("testToken")) } }) // Määrittele mockattu käyttäjä
}))

describe("ManualTrips component", () => {
    const mockAddTrip = addTrip as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
      })

    test("component renders correctly", async () => {
        const setDistanceMock = jest.fn()
        render(<ManualTrips distance={100} setDistance={setDistanceMock}/>)

        await waitFor(() => {
            expect(screen.getByTestId("header").textContent).toBe("Add trip")
        })
    })

    test("addTrip is called with correct parameters", async () => {
        const setDistanceMock = jest.fn()
        render(<ManualTrips distance={100} setDistance={setDistanceMock}/>)

        const distanceInput = screen.getByLabelText("Distance")
        const dateInput = screen.getByLabelText("Date")
        const startTimeInput = screen.getByLabelText("Start time")
        const endTimeInput = screen.getByLabelText("End time")

        const form = screen.getByTestId("form")

        const distance = "100"
        const date = "12/12/2022"
        const startTime = "12:00 AM"
        const endTime = "12:05 AM"

        await waitFor(() => {
            expect(distanceInput).toBeInTheDocument()
            expect(dateInput).toBeInTheDocument()
            expect(startTimeInput).toBeInTheDocument()
            expect(endTimeInput).toBeInTheDocument()
            expect(form).toBeInTheDocument()
        })

        await waitFor(() => {
            fireEvent.change(distanceInput, { target: { value: distance }})
            fireEvent.change(dateInput, { target: { value: date }})
            fireEvent.change(startTimeInput, { target: { value: startTime }})
            fireEvent.change(endTimeInput, { target: { value: endTime }})
        })

        await waitFor(() => {
            fireEvent.click(screen.getByTestId("submit_button"))
        })

        await waitFor(() => {
            expect(mockAddTrip).toHaveBeenCalledTimes(1)
            expect(mockAddTrip).toHaveBeenCalledWith("testToken", {
                tripDistance: 100,
                startTime: new Date("2022-12-11T22:00:00.000Z"),
                endTime: new Date("2022-12-11T22:05:00.000Z")
            })
        })
    })

    test("addTrip is not called when form is submitted with missing data", async () => {
        const setDistanceMock = jest.fn()
        render(<ManualTrips distance={100} setDistance={setDistanceMock}/>)

        const distanceInput = screen.getByLabelText("Distance")
        const dateInput = screen.getByLabelText("Date")
        const startTimeInput = screen.getByLabelText("Start time")
        const endTimeInput = screen.getByLabelText("End time")

        const form = screen.getByTestId("form")

        await waitFor(() => {
            expect(distanceInput).toBeInTheDocument()
            expect(dateInput).toBeInTheDocument()
            expect(startTimeInput).toBeInTheDocument()
            expect(endTimeInput).toBeInTheDocument()
            expect(form).toBeInTheDocument()
        })

        await waitFor(() => {
            fireEvent.click(screen.getByTestId("submit_button"))
        })

        await waitFor(() => {
            expect(mockAddTrip).toHaveBeenCalledTimes(0)
        })
    })
})