import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { TheftMarker } from './TheftMarker'
import { ReactNode } from 'react'

jest.mock("../services/theftService", () => ({
    sendTheftReport: jest.fn(),
  }))
  
jest.mock("react-leaflet", () => ({
    Marker: ({ children }: { children: ReactNode}) => <div>{children}</div>,
    Popup: ({ children }: { children: ReactNode}) => <div>{children}</div>,
    useMapEvents: jest.fn(),
}))
  
describe("TheftMarker component", () => {
    let setCoordinates: jest.Mock
  
    beforeEach(() => {
      setCoordinates = jest.fn()
      jest.clearAllMocks()
    })
  
    test("renders null when position is not set", () => {
      const { container } = render(
        <TheftMarker reportMode={false} setCoordinates={setCoordinates} coordinates={[]} />
      )
      expect(container.firstChild).toBeNull()
    })
})