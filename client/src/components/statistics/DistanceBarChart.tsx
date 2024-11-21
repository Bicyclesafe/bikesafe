import { BarDatum, ComputedDatum, ResponsiveBar } from "@nivo/bar"
//import { Line } from "@nivo/line"
import { useCallback, useEffect, useState } from "react"
import tripService from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { Trip } from "../../types"
import { getDate, getDaysInMonth, getMonth } from "date-fns"

const DistanceBarChart = () => {
  const [data, setData] = useState<BarDatum[]>([])
  const [viewMode, setViewMode] = useState<"day" | "year">("year")
  const [month, setMonth] = useState<string | null>(null)
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  const { user } = useAuth()

  
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
    const monthlyData = Array.from({ length: 12 }, (_, month) => ({
      monthName: new Date(0, month).toLocaleString('default', { month: 'short' }),
      distance: 0,
      monthNumber: month + 1
    }))
    
    trips.forEach((trip: Trip) => {
      const month = new Date(trip.startTime).getMonth()
      monthlyData[month].distance += Number(trip.tripDistance.toFixed(0))
    })
    
    return monthlyData
  }
  
  const transformDataToDaily = useCallback((trips: Trip[]) => {
    if (!month) {
      return []
    }
    
    const daysInMonth = getDaysInMonth(new Date(parseInt(year), parseInt(month)))
    const dailyData = Array.from({ length: daysInMonth }, (_, day) => ({
      day: (day + 1).toString(),
      distance: 0,
    }))
    
    trips.forEach((trip: Trip) => {
      const tripDate = trip.startTime
      if (getMonth(tripDate) + 1 === Number(month)) {
        const day = getDate(tripDate) - 1
        dailyData[day].distance += Number(trip.tripDistance.toFixed(0))
      }
    })
    
    return dailyData
  }, [month, year])
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken(true)
        const trips = await tripService.getAllTrips(token as string, year, month)

        if (viewMode === "year") {
          setData(transformDataToMonthly(trips))
        } else if (viewMode === "day") {
          setData(transformDataToDaily(trips))
        }
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }
    fetchData()
  }, [month, transformDataToDaily, user, viewMode, year])

  const lineData = data.map((entry) => ({
    x: entry.month || entry.day,
    y: entry.distance,
  }))
  console.log(lineData)
  console.log(data)
  console.log("M 30,23 L " + data.map(d => `${30 + Number(d.monthNumber) * 30},${d.distance}`).join(" L "))

  return (
    <div style={{ position: "relative", height: '600px' }}>
      <select onChange={(e) => setYear(e.target.value)}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
      <ResponsiveBar
        data={data}
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
        layers={[
          "grid",
          "axes",
          "bars",
          // Add a custom layer for the Line chart
          ({ innerWidth, innerHeight, xScale, yScale }) => {
            console.log(xScale.range())
            console.log(yScale.range())
            console.log(innerHeight)
            console.log(innerWidth)
            return(
            /*<Line
              data={[{ id: "Distance", data: lineData }]}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto" }}
              width={innerWidth}
              height={innerHeight}
              lineWidth={3}
              colors={{ scheme: "dark2" }}
              curve="monotoneX"
              enableArea={false}
              enablePoints={false}
              axisBottom={null} // Disable bottom axis, as it is already drawn by the bar chart
              axisLeft={null} // Disable left axis, as it is already drawn by the bar chart
            />*/
            <path
              d={
                `M 0,${innerHeight} L ` + data.map(d => `${-20 + Number(d.monthNumber) * innerWidth / 12.5},${innerHeight - Number(d.distance) * 2.97}`).join(" L ")
              }
              fill="none"
              stroke="red"
            />
          )},
        ]}
      />
      
      {month &&
        <button onClick={() => { setMonth(null); setViewMode("year") }}>
          Return to yearly view
        </button>
      }
    </div>
  )
}

/*<Line
  data={[
    {
      id: "Distance",
      data: lineData,
    },
  ]}
  margin={{ top: 0, right: 0, bottom: 50, left: 60 }}
  xScale={{ type: "point" }}
  yScale={{ type: "linear", min: "auto", max: "auto" }}
  lineWidth={3}
  colors={{ scheme: "dark2" }}
  curve="monotoneX"
  enableArea={false}
  enablePoints={false}
  axisBottom={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: getNivoBarSettings(viewMode).axisBottomLegend,
    legendPosition: "middle",
    legendOffset: 32,
  }}
  axisLeft={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Distance (km)",
    legendPosition: "middle",
    legendOffset: -40,
  }}
  height={600}
  width={800}
/>*/
  
export default DistanceBarChart