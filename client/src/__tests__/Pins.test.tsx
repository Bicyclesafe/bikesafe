import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Pins } from '../components/pins/Pins'

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

jest.mock('../services/theftService', () => ({
  deleteTheft: jest.fn(),
}))

test('renders correct amount of markers', async () => {
  const coordinates = [
    { id: 1, lat: 51.505, lng: -0.09 },
    { id: 2, lat: 52.505, lng: -0.09 }
  ]

  const mockDeletePin = jest.fn()

  render(<Pins pinData={coordinates} isChecked={true} typeOfPin='' deletePin={mockDeletePin}/>)
  expect(await screen.getAllByTestId('marker')).toHaveLength(2)
})

test('renders markers at correct coordinates', async () => {
  const coordinates = [
    { id: 1, lat: 51.505, lng: -0.09 },
    { id: 2, lat: 52.505, lng: -0.09 }
  ]
  
  const mockDeletePin = jest.fn()

  render(<Pins pinData={coordinates} isChecked={true} typeOfPin='' deletePin={mockDeletePin}/>)
  expect(await screen.getByText("51.505 -0.09")).toBeInTheDocument()
  expect(await screen.getByText("52.505 -0.09")).toBeInTheDocument()
})

test('Renders null when isChecked is false', async () => {
  const { container } = render(<Pins pinData={[]} isChecked={false} typeOfPin='' deletePin={() => {}}/>)
  expect(container.firstChild).toBeNull()
})
 