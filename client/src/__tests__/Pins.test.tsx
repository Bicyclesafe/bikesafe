import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Pins } from '../components/Pins'

// Mock Leaflet's marker creation
jest.mock('react-leaflet', () => {
  const actual = jest.requireActual('leaflet')
  return {
    ...actual,
    MapContainer: jest.fn(({ children }) => <div>{children}</div>),  // Mock MapContainer
    Marker: jest.fn(({ position }) => <div data-testid="marker">{position[0]} {position[1]}</div>),  // Mock Marker
    Popup: jest.fn(() => <div data-testid="popup"></div>),  // Mock Popup
  }
})

test('renders correct amount of markers', async () => {
  const coordinates = [
    { id: 1, lat: 51.505, lng: -0.09 },
    { id: 2, lat: 52.505, lng: -0.09 }
  ]

  render(<Pins pinData={coordinates} isChecked={true} typeOfPin=''/>)
  expect(await screen.getAllByTestId('marker')).toHaveLength(2)
})

test('renders markers at correct coordinates', async () => {
  const coordinates = [
    { id: 1, lat: 51.505, lng: -0.09 },
    { id: 2, lat: 52.505, lng: -0.09 }
  ]
  
  render(<Pins pinData={coordinates} isChecked={true} typeOfPin=''/>)
  expect(await screen.getByText("51.505 -0.09")).toBeInTheDocument()
  expect(await screen.getByText("52.505 -0.09")).toBeInTheDocument()
})
 