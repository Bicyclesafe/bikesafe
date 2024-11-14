import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import { TheftMarker } from '../components/pins/TheftMarker'
import { LatLng } from 'leaflet'
import React from 'react'
import { useMapEvents } from 'react-leaflet'

jest.mock("../services/theftService", () => ({
  sendTheftReport: jest.fn(),
}))

// Define the mock implementation in a separate function
jest.mock("react-leaflet", () => {
  // eslint-disable-next-line
  const React = require("react")
  function Marker({ position, children }: { position: LatLng, children: React.ReactNode }) {
    const markerRef = React.createRef()
    return <div ref={markerRef} data-testid="marker" data-position={JSON.stringify(position)}>{children}</div>
  }

  function Popup({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
  }

  return {
    Marker: jest.fn(Marker),
    Popup: jest.fn(Popup),
    useMapEvents: jest.fn((events) => {
      // Simulate a click event, updating position
      return { click: events.click }
    }),
  }
})

describe("TheftMarker component", () => {
  let setTheftPosition: jest.Mock

  beforeEach(() => {
    setTheftPosition = jest.fn()
    jest.clearAllMocks()
  })

  test("renders null when position is not set", () => {
    const { container } = render(
      <TheftMarker reportMode={false} theftPosition={null} setTheftPosition={setTheftPosition} />
    )
    expect(container.firstChild).toBeNull()
  })

  test('renders without crashing', () => {
    render(<TheftMarker reportMode={true} theftPosition={null} setTheftPosition={setTheftPosition} />)
  })

  test("renders marker correctly when map is clicked", async () => {
    const position = new LatLng(51.505, -0.09)

    render(
      <TheftMarker reportMode={true} theftPosition={position} setTheftPosition={setTheftPosition} />
    )

    const marker = await screen.findByTestId('marker')
    expect(marker).toBeInTheDocument()
    expect(marker).toHaveAttribute('data-position', JSON.stringify({ lat: 51.505, lng: -0.09 }))
  })

  test("Calls setTheftPosition with correct position on map click", async () => {
    const mockUseMapEvents = useMapEvents as jest.Mock

    render(
      <TheftMarker reportMode={true} theftPosition={null} setTheftPosition={setTheftPosition} />
    )

    const mapEvent = { latlng: { lat: 51.505, lng: -0.09 } }

    await act(async () => {
      mockUseMapEvents.mock.calls[0][0].click(mapEvent)
    })

    expect(setTheftPosition.mock.calls).toHaveLength(1)
    expect(setTheftPosition.mock.calls[0][0]).toEqual({ lat: 51.505, lng: -0.09 })
  })
})
