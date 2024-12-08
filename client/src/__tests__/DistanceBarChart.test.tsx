import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import DistanceBarChart from "../components/statistics/DistanceBarChart"
import { ReactNode } from "react"
import { Filters } from "../types"

jest.mock('@nivo/core', () => ({
  ...jest.requireActual('@nivo/core'),
  ResponsiveWrapper: ({ children }: { children: ({ width, height }: { width: number; height: number }) => ReactNode }) => 
    children({ width: 400, height: 400 }),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('DistanceBarChart Component', () => {
  const trips = [
    {
      id: 1,
      userId: 1,
      startTime: new Date('2024-01-15 06:00:00'),
      endTime: new Date('2024-01-15 07:45:00'),
      tripDistance: 10
    },
    {
      id: 2,
      userId: 1,
      startTime: new Date('2024-02-20 15:00:00'),
      endTime: new Date('2024-02-20 17:00:00'),
      tripDistance: 15
    },
    {
      id: 3,
      userId: 1,
      startTime: new Date('2024-07-01 13:00:00'),
      endTime: new Date('2024-07-01 14:30:00'),
      tripDistance: 30
    },
    {
      id: 4,
      userId: 1,
      startTime: new Date('2023-05-01 13:00:00'),
      endTime: new Date('2024-05-01 14:30:00'),
      tripDistance: 22
    },
  ]

  const filters: Filters = {
    testFilter: {
      label: 'Emissions saved compared to a Car',
      isChecked: true,
    }
  }

  it('renders the chart when data is passed', () => {
    const { container } = render(<DistanceBarChart rawData={trips} year="2024" filters={filters} />)

    const bars = container.querySelectorAll('svg rect')
    expect(bars.length).toBeGreaterThan(0)
  })


  it('renders nothing when no data is passed', () => {
    const { container } = render(<DistanceBarChart rawData={[]} year="2024" filters={filters} />)
  
    const bars = container.querySelectorAll('svg rect')
    expect(bars.length).toBe(0)
  })


  it('renders correct month label', () => {
    render(<DistanceBarChart rawData={trips} year="2024" filters={filters} />)

    expect(screen.getByText("Month")).toBeInTheDocument()
  })
  
  it('renders correct distance label', () => {
    render(<DistanceBarChart rawData={trips} year="2024" filters={filters} />)
  
    expect(screen.getByText("Distance (km)")).toBeInTheDocument()
  })

  it('renders the correct number of bars in year view', () => {
    const { container } = render(<DistanceBarChart rawData={trips} year="2024" filters={filters} />)
    const bars = container.querySelectorAll('svg rect[focusable="false"]')

    expect(bars.length).toBe(12)
  })

  it('renders only the bars for the selected year\'s', () => {
    const { container } = render(<DistanceBarChart rawData={trips} year="2023" filters={filters} />)
    const bars = Array.from(container.querySelectorAll('svg rect[focusable="false"]'))
    .filter(bar => {
      const heightString = bar.getAttribute('height')
      const height = heightString !== null ? parseFloat(heightString) : 0
      return height > 0
    })

    expect(bars.length).toBe(1)
  })

  /*it('year view displays the correct height for each bar', async () => {
    const { container } = render(<DistanceBarChart rawData={trips} year="2024" />)

    await waitFor(() => container.querySelectorAll('svg rect[focusable="false"]'))

    const bars = Array.from(container.querySelectorAll('svg rect[focusable="false"]'))
    .filter(bar => {
      const heightString = bar.getAttribute('height')
      const height = heightString !== null ? parseFloat(heightString) : 0
      return height > 0
    })

    expect(bars[0].getAttribute('height')).toBe("100")
    expect(bars[1].getAttribute('height')).toBe("150")
    expect(bars[2].getAttribute('height')).toBe("300")
  })*/

  it('switches to month view when month bar is clicked', async () => {
    const { container } = render(<DistanceBarChart rawData={trips} year="2024" filters={filters} />)

    await waitFor(() => container.querySelectorAll('svg rect[focusable="false"]'))

    const bars = Array.from(container.querySelectorAll('svg rect[focusable="false"]'))
    .filter(bar => {
      const heightString = bar.getAttribute('height')
      const height = heightString !== null ? parseFloat(heightString) : 0
      return height > 0
    })

    fireEvent.click(bars[0])

    expect(screen.getByText('Day')).toBeInTheDocument()
    expect(screen.getByText('Return to yearly view')).toBeInTheDocument()
  })

  it('month view displays the correct number of bars', async () => {
    const { container } = render(<DistanceBarChart rawData={trips} year="2024" filters={filters} />)

    await waitFor(() => container.querySelectorAll('svg rect[focusable="false"]'))

    const yearBars = Array.from(container.querySelectorAll('svg rect[focusable="false"]'))
      .filter(bar => {
        const heightString = bar.getAttribute('height')
        const height = heightString !== null ? parseFloat(heightString) : 0
        return height > 0
    })

    fireEvent.click(yearBars[0])

    await waitFor(() => {
      const dayBars = container.querySelectorAll('svg rect[focusable="false"]')
      expect(dayBars.length).toBe(31)
    })
  })

  /*it('month view displays the correct height for each bar', async () => {
    const { container } = render(<DistanceBarChart rawData={trips} year="2024" filters={filters} />)

    await waitFor(() => container.querySelectorAll('svg rect[focusable="false"]'))

    const yearBars = container.querySelectorAll('svg rect[focusable="false"]')

    fireEvent.click(yearBars[0])

    await waitFor(() => {
      const dayBars = Array.from(container.querySelectorAll('svg rect[focusable="false"]'))
        .filter(bar => {
          const heightString = bar.getAttribute('height')
          const height = heightString !== null ? parseFloat(heightString) : 0
          return height > 0
      })

      expect(dayBars[0].getAttribute('height')).toBe("100")
    })
  })*/
})