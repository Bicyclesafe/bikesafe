import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { TheftMarker } from './TheftMarker'
import { LatLng } from "leaflet"
import { sendTheftReport } from "../services/theftService"

jest.mock("../services/theftService", () => ({
    sendTheftReport: jest.fn(),
  }))
  
jest.mock("react-leaflet", () => ({
    Marker: ({ children }) => <div>{children}</div>,
    Popup: ({ children }) => <div>{children}</div>,
    useMapEvents: jest.fn(),
}))
  
describe("TheftMarker component", () => {
    let setCoordinates
  
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