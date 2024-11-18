import { render, screen } from '@testing-library/react'
import CommuteModal from "../components/commute/CommuteModal"

jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: { uid: "testUserId", getIdToken: jest.fn() } }) // Define mocked user
}))

jest.mock("../services/commuteService", () => ({
  addCommuteDistance: jest.fn(),
}))

describe("CommuteModal component", () => {
  test("renders correctly", async () => {
		render(<CommuteModal routeDistance={2.87} />)
		const distanceText = await screen.findByText('Commute distance: 2.87')
		const buttonText = await screen.findByText('Save Commute')
		expect(distanceText).toBeInTheDocument()
		expect(buttonText).toBeInTheDocument()
  })
})