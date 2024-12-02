import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ReportModal from '../components/report/ReportModal'
import { LatLng } from 'leaflet'

jest.mock("../services/theftService", () => ({
  sendTheftReport: jest.fn()
}))

jest.mock("../components/report/ReportModal.module.css", () => ({}))
jest.mock("../App.module.css", () => ({}))

jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn() } }),
}))


describe("ReportModal component", () => {
  test("handleReportConfirm is called when confirm button clicked", async () => {
    const setTheftPositionMock = jest.fn()
    const setBikeTheftsMock = jest.fn()

    const theftPosition = new LatLng(60, 24)

    render(
      <ReportModal
        theftPosition={theftPosition}
        setTheftPosition={setTheftPositionMock}
        bikeThefts={[]}
        setBikeThefts={setBikeTheftsMock}
      />
    )

    const button = screen.getByText("Confirm")
    fireEvent.click(button)
    
    await waitFor(() => expect(setBikeTheftsMock).toHaveBeenCalledTimes(1))
  })

  test("Renders null when theftPosition is null", () => {
    const { container } = render(
      <ReportModal
        theftPosition={null}
        setTheftPosition={() => {}}
        bikeThefts={[]}
        setBikeThefts={() => {}}
      />
    )

    expect(container.firstChild).toBe(null)
  })
})