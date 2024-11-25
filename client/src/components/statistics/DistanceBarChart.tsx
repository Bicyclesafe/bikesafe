import { BarDatum, ComputedDatum, ResponsiveBar } from "@nivo/bar"
import { FC, useCallback, useEffect, useState } from "react"
import { Trip } from "../../types"
import { getDate, getDaysInMonth, getMonth } from "date-fns"

const DistanceBarChart: FC<{ rawData: Trip[] }> = ({ rawData = [] }) => {
  const [transformedData, setTransformedData] = useState<BarDatum[]>([])
  const [viewMode, setViewMode] = useState<"day" | "year">("year")
  const [month, setMonth] = useState<string | null>(null)
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  
  const getNivoBarSettings = (mode: "day" | "year") => {
    if (mode === "year") {
      return {
        index: "monthName",
        axisBottomLegend: "Month",
        onClick: (barData: ComputedDatum<BarDatum>) => {
          setMonth(barData.data.monthNumber.toString())
          setViewMode("day")
        },
      }
    }
  
    return {
      index: "day",
      axisBottomLegend: "Day",
      onClick: () => {}
    }
  }
  
  const transformDataToMonthly = (trips: Trip[]) => {
    const filteredTrips = trips.filter(
      (trip) => new Date(trip.startTime).getFullYear() === Number(year)
    )
    
    const monthlyData = Array.from({ length: 12 }, (_, month) => ({
      monthName: new Date(0, month).toLocaleString('default', { month: 'short' }),
      distance: 0,
      monthNumber: month + 1
    }))
    
    filteredTrips.forEach((trip: Trip) => {
      const month = new Date(trip.startTime).getMonth()
      monthlyData[month].distance += trip.tripDistance
    })

    monthlyData.forEach((data) => {
      data.distance = parseFloat(data.distance.toFixed(1))
    })
    
    return monthlyData
  }
  
  const transformDataToDaily = useCallback((trips: Trip[]) => {
    if (!month) {
      return []
    }

    const filteredTrips = trips.filter(
      (trip) => new Date(trip.startTime).getFullYear() === Number(year)
    )
    
    const daysInMonth = getDaysInMonth(new Date(parseInt(year), parseInt(month)))
    const dailyData = Array.from({ length: daysInMonth }, (_, day) => ({
      day: (day + 1).toString(),
      distance: 0,
    }))
    
    filteredTrips.forEach((trip: Trip) => {
      const tripDate = trip.startTime
      if (getMonth(tripDate) + 1 === Number(month)) {
        const day = getDate(tripDate) - 1
        dailyData[day].distance += trip.tripDistance
      }
    })

    dailyData.forEach((data) => {
      data.distance = parseFloat(data.distance.toFixed(1))
    })
    
    return dailyData
  }, [month, year])

  useEffect(() => {
    if (viewMode === "year") {
      setTransformedData(transformDataToMonthly(rawData))
    } else if (viewMode === "day" && month) {
      setTransformedData(transformDataToDaily(rawData))
    }
  }, [rawData, viewMode, month, year, transformDataToDaily, transformDataToMonthly])

  return (
    <div style={{ height: '600px' }}>
      <select onChange={(e) => setYear(e.target.value)}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
      <ResponsiveBar
        data={transformedData}
        keys={['distance']}
        indexBy={getNivoBarSettings(viewMode).index}
        enableLabel={false}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'dark2' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: getNivoBarSettings(viewMode).axisBottomLegend,
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Distance (km)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionConfig="stiff"
        onClick={getNivoBarSettings(viewMode).onClick}
      />
      {month &&
        <button onClick={() => { setMonth(null); setViewMode("year") }}>
          Return to yearly view
        </button>
      }
    </div>
  )
}
  
export default DistanceBarChart