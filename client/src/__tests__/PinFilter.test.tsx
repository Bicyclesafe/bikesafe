import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import { PinFilter } from '../components/PinFilter'

const filter =
{
    bikeTheft: {
      label: 'Theft Locations',
      isChecked: true,
    },
    lockStation: {
      label: 'Lock Stations',
      isChecked: true,
    }
  }

describe("PinFilter component", () => {
  
  
    test("renders component", async () => {
         render(
        <PinFilter filters={filter} handleFilterChange={() => {}} />
       
      )
      const theftLocations = await screen.findByText('Theft Locations')
      expect(theftLocations).toBeInTheDocument()
      const lock_stations = await screen.findByText('Lock Stations')
      expect(lock_stations).toBeInTheDocument()
    })
})