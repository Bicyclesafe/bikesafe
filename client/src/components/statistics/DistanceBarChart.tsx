import { BarDatum, ComputedDatum, ResponsiveBar } from "@nivo/bar"
import { useCallback, useEffect, useState } from "react"
import tripService from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { ChartData, LineLayer, Trip } from "../../types"
import { getDate, getDaysInMonth, getMonth } from "date-fns"

const DistanceBarChart = () => {
  const [barData, setBarData] = useState<BarDatum[]>([])
  const [emissionPerDateData, setEmissionPerDateData] = useState<BarDatum[]>([])
  const [emissionTotalData, setEmissionTotalData] = useState<BarDatum[]>([])
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
  
  const transformDataToMonthly = (data: ChartData[]) => {
    const monthlyData = Array.from({ length: 12 }, (_, month) => ({
      monthName: new Date(0, month).toLocaleString('default', { month: 'short' }),
      value: 0,
      monthNumber: month + 1
    }))
    
    data.forEach(({time, value}) => {
      const month = new Date(time).getMonth()
      monthlyData[month].value += Number(value.toFixed(0))
    })

    return monthlyData
  }
  
  const transformDataToDaily = useCallback((data: ChartData[]) => {
    if (!month) {
      return []
    }
    
    const daysInMonth = getDaysInMonth(new Date(parseInt(year), parseInt(month)))
    const dailyData = Array.from({ length: daysInMonth }, (_, day) => ({
      day: (day + 1).toString(),
      value: 0,
    }))
    
    data.forEach(({time, value}) => {
      if (getMonth(time) + 1 === Number(month)) {
        const day = getDate(time) - 1
        dailyData[day].value += Number(value.toFixed(0))
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
          setBarData(transformDataToMonthly(createBarData(trips)))
          setEmissionPerDateData(transformDataToMonthly(createEmissionPerDateData(trips)))
          setEmissionTotalData(createEmissionTotalData(transformDataToMonthly(createEmissionPerDateData(trips))))
        } else if (viewMode === "day") {
          setBarData(transformDataToDaily(createBarData(trips)))
          setEmissionPerDateData(transformDataToDaily(createEmissionPerDateData(trips)))
          setEmissionTotalData(createEmissionTotalData(transformDataToDaily(createEmissionPerDateData(trips))))
        }
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }
    fetchData()
  }, [month, transformDataToDaily, user, viewMode, year])

  const lineLayer = ({innerHeight, bars, data, color}: LineLayer) => {
    if (bars.length === 0) return
    if ((viewMode === "day" && !data[0].day) || (viewMode === "year" && !data[0].monthNumber)) return

    const maxValue = Math.max(...bars.map(bar => Number(bar.data.value)))
    const positionsAsStrings = data.map(d => {
      const barIndex = (viewMode === "year" ? Number(d.monthNumber) : Number(d.day)) - 1
      const xPosition = bars[barIndex].width / 2 + bars[barIndex].x
      const yPosition = innerHeight - Number(d.value) * innerHeight / maxValue
      return `${xPosition},${yPosition}`
    })

    return (
      <path
        d={
          `M 0,${innerHeight} L ` + positionsAsStrings.join(" L ")
        }
        fill="none"
        stroke={color}
      />
    )
  }

  const createBarData = (trips: Trip[]) => {
    return trips.map(trip => ({time: trip.startTime, value: trip.tripDistance}))
  }

  const createEmissionPerDateData = (trips: Trip[]) => {
    const emissionsPerKM = 248.5484 / 1000
    return trips.map(trip => ({time: trip.startTime, value: trip.tripDistance * emissionsPerKM}))
  }

  const createEmissionTotalData = (data: BarDatum[]) => {
    const emissionTotalData = []
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      sum += Number(data[i].value)
      emissionTotalData.push({monthName: data[i].monthName, monthNumber: data[i].monthNumber, value: sum})
    }
    console.log(emissionTotalData)
    return emissionTotalData
  }

  return (
    <div style={{ position: "relative", height: '600px' }}>
      <select onChange={(e) => setYear(e.target.value)}>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
      <ResponsiveBar
        data={barData}
        keys={['value']}
        indexBy={getNivoBarSettings(viewMode).index}
        enableLabel={false}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'dark2' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Emissions (kg/km)",
          legendPosition: 'middle',
          legendOffset: 32,
        }}
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
          ({innerHeight, bars}) => lineLayer({innerHeight, bars, data: emissionPerDateData, color: "red"}),
          ({innerHeight, bars}) => lineLayer({innerHeight, bars, data: emissionTotalData, color: "blue"}),
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
  
export default DistanceBarChart