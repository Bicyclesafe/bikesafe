import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import StatisticFilters from '../components/statistics/StatisticsFilters'
import { Filters } from '../types'

const initialFilters: Filters = {
  emissionCarPerDate: {
    label: 'Car emissions saved (Daily)',
    isChecked: true,
  },
  emissionCarTotal: {
    label: 'Car emissions saved (Yearly)',
    isChecked: true,
  },
  emissionBusPerDate: {
    label: 'Bus emissions saved (Daily)',
    isChecked: true,
  },
  emissionsBusTotal: {
    label: 'Bus emissions saved (Yearly)',
    isChecked: true,
  },
  fuelCostCarPerDate: {
    label: 'Fuel cost saved (Daily)',
    isChecked: true,
  },
  fuelCostCarTotal: {
    label: 'Fuel cost saved (Yearly)',
    isChecked: true,
  }
}

describe('StatisticFilters component', () => {
  test('renders correctly with filters', () => {
    render(
      <StatisticFilters
        filters={initialFilters}
        setFilters={jest.fn()}
        showFilters={true}
        setShowFilters={jest.fn()}
      />
    )

    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByText('Car emissions saved (Daily)')).toBeInTheDocument()
    expect(screen.getByText('Car emissions saved (Yearly)')).toBeInTheDocument()
    expect(screen.getByText('Bus emissions saved (Daily)')).toBeInTheDocument()
    expect(screen.getByText('Bus emissions saved (Yearly)')).toBeInTheDocument()
    expect(screen.getByText('Fuel cost saved (Daily)')).toBeInTheDocument()
    expect(screen.getByText('Fuel cost saved (Yearly)')).toBeInTheDocument()
  })

  test('toggles filter visibility when button is clicked', () => {
    const setShowFiltersMock = jest.fn()
    render(
      <StatisticFilters
        filters={initialFilters}
        setFilters={jest.fn()}
        showFilters={true}
        setShowFilters={setShowFiltersMock}
      />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(setShowFiltersMock).toHaveBeenCalledWith(false)
  })

  test('calls setFilters when a filter is changed', () => {
    const setFiltersMock = jest.fn()
    render(
      <StatisticFilters
        filters={initialFilters}
        setFilters={setFiltersMock}
        showFilters={true}
        setShowFilters={jest.fn()}
      />
    )

    const checkbox = screen.getByLabelText('Car emissions saved (Daily)')
    fireEvent.click(checkbox)

    expect(setFiltersMock).toHaveBeenCalledWith(expect.any(Function))
  })
})