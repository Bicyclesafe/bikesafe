import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import { PinFilterOption } from '../components/PinFilterOption'

describe("PinfilterOption component", () => {
  
  
    test("renders component", async () => {
         render(
        <PinFilterOption name='name' isChecked={true} label='Theft Locations' onChange={() => {}} />
       
      )
      const filter_view = await screen.findByText('Theft Locations')
      expect(filter_view).toBeInTheDocument()
    })
})