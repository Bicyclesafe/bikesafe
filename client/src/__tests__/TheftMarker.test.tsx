import '@testing-library/jest-dom'
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import { TheftMarker } from '../components/TheftMarker'
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
  let setBikeThefts: jest.Mock

  beforeEach(() => {
    setBikeThefts = jest.fn()
    jest.clearAllMocks()
  })

  test("renders null when position is not set", () => {
    const { container } = render(
      <TheftMarker reportMode={false} setBikeThefts={setBikeThefts} bikeThefts={[]} />
    )
    expect(container.firstChild).toBeNull()
  })

  test('renders without crashing', () => {
    render(<TheftMarker reportMode={true} setBikeThefts={setBikeThefts} bikeThefts={[]} />)
  })

  test("renders marker correctly when map is clicked", async () => {
    const bikeThefts = [{ id: 1, coordinate: { lat: 51.505, lng: -0.09, id:2 }}]
    const mockUseMapEvents = useMapEvents as jest.Mock
    
    // Render the component with reportMode enabled
    render(
      <TheftMarker reportMode={true} setBikeThefts={setBikeThefts} bikeThefts={bikeThefts} />
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
    const bikeThefts = [{ id: 1, coordinate: { lat: 51.505, lng: -0.09, id:1 }}]
    const mockUseMapEvents = useMapEvents as jest.Mock
    
    // Render the component with reportMode enabled
    const { getByText } = render(
      <TheftMarker reportMode={true} setBikeThefts={setBikeThefts} bikeThefts={bikeThefts} />
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

  test('calls handleReportConfirm when confirm button is clicked', async () => {
    const bikeThefts = [{ id: 1, coordinate: { lat: 51.505, lng: -0.09, id: 1 } }]
    const mockSendTheftReport = require('../services/theftService').sendTheftReport

    // Render the component with reportMode enabled
    const { getByText } = render(
      <TheftMarker reportMode={true} setBikeThefts={setBikeThefts} bikeThefts={bikeThefts} />
    );

    // Simulate a map click event
    await act(async () => {
      const mapEvent = { latlng: { lat: 51.505, lng: -0.09 } };
      (useMapEvents as jest.Mock).mock.calls[0][0].click(mapEvent); // Simulate map click
    });

    // Wait for the popup to appear (after timeout)
    await waitFor(() => {
      const marker = screen.getByTestId('marker');
      expect(marker).toBeInTheDocument();
    });

    // Simulate a click on the confirm button
    const confirmButton = getByText('Confirm');
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    expect(mockSendTheftReport).toHaveBeenCalledTimes(1);
    expect(mockSendTheftReport).toHaveBeenCalledWith(new LatLng(51.505, -0.09));
  })
})
