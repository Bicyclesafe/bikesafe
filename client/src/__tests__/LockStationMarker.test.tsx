import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LockStationMarker from '../components/LockStationMarker'

jest.mock('react-leaflet', () => {
  const actual = jest.requireActual('leaflet')
  return {
    ...actual,
    Polyline: jest.fn(({ positions }) => (<div>{positions[0].lat} {positions[0].lng}; {positions[1].lat} {positions[1].lng}</div>))
  }
})

describe("LockStation component", () => {
  test("Line is rendered at the correct positions", () => {
    const lockStationGroup = [
      {
        id: 1,
        groupId: 1,
        coordinate: {
          id: 1,
          lat: 60,
          lng: 24
        }
      },
      {
        id: 2,
        groupId: 1,
        coordinate: {
          id: 2,
          lat: 65,
          lng: 25
        }
      }
    ]
    
    render(<LockStationMarker stationsGroup={lockStationGroup}/>)
    expect(screen.getByText("60 24; 65 25")).toBeInTheDocument()
  })
})