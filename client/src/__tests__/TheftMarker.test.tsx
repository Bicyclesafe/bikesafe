import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from '@testing-library/react'
import { TheftMarker } from '../components/TheftMarker'
import { LatLng } from 'leaflet'
import { ReactNode, forwardRef } from 'react'
import { useMapEvents } from 'react-leaflet'

jest.mock("../services/theftService", () => ({
  sendTheftReport: jest.fn(),
}))


describe("TheftMarker component", () => {
  let setCoordinates: jest.Mock

  beforeEach(() => {
    setCoordinates = jest.fn()
    jest.clearAllMocks()
  })

  jest.mock("react-leaflet", () => ({
    Marker: forwardRef<HTMLDivElement, { position: LatLng, children: ReactNode }>(({ position, children }, ref) => (
      <div ref={ref} data-testid="marker" data-position={JSON.stringify(position)}>
        {children}
      </div>
    )),
    Popup: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    useMapEvents: jest.fn((events) => {
      // Simulate a click event, updating position
      return { click: events.click }
    }),
  }))

  test("renders null when position is not set", () => {
    const { container } = render(
      <TheftMarker reportMode={false} setCoordinates={setCoordinates} coordinates={[]} />
    )
    expect(container.firstChild).toBeNull()
  })

  test("renders marker correctly when map is clicked", async () => {
    const coordinates = [{ lat: 51.505, lng: -0.09, id:2, type:"biketheft" }]
    const mockUseMapEvents = useMapEvents as jest.Mock
    
    // Render the component with reportMode enabled
    render(
      <TheftMarker reportMode={true} setCoordinates={setCoordinates} coordinates={coordinates} />
    )

    // Simulate a map click event (the mock of useMapEvents should handle this)
    await act(async ()=> {
      const mapEvent = { latlng: { lat: 51.505, lng: -0.09 } }
      mockUseMapEvents.mock.calls[0][0].click(mapEvent) // Simulate map click
    })
      
    // Wait for the marker to appear
    const marker = await screen.findByTestId('marker')

    // Assert that the marker is rendered
    expect(marker).toBeInTheDocument()

    // Assert that the marker has the correct position
    expect(marker).toHaveAttribute('data-position', JSON.stringify({ lat: 51.505, lng: -0.09 }))
  })

  test("opens popup when marker is placed", async () => {
    const coordinates = [{ lat: 51.505, lng: -0.09, id:1, type:"bikeTheft" }]
    const mockUseMapEvents = useMapEvents as jest.Mock
    
    // Render the component with reportMode enabled
    const { getByText } = render(
      <TheftMarker reportMode={true} setCoordinates={setCoordinates} coordinates={coordinates} />
    )

    // Simulate a map click event
    await act(async ()=> {
    const mapEvent = { latlng: { lat: 51.505, lng: -0.09 } }
    mockUseMapEvents.mock.calls[0][0].click(mapEvent) // Simulate map click
    })

    // Wait for the popup to appear (after timeout)
    await waitFor(() => {
      const marker = screen.getByTestId('marker')
      expect(marker).toBeInTheDocument()
    })

    //test if the confirm button inside the popup is rendered
    const confirmButton = getByText(/confirm/i)
    expect(confirmButton).toBeInTheDocument()

  })
})
