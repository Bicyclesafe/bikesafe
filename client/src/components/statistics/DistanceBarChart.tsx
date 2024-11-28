import { BarDatum, ComputedDatum, ResponsiveBar } from "@nivo/bar"
import { useCallback, useEffect, useState } from "react"
import tripService from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { ChartData, LineLayerInfo, Trip } from "../../types"
import { getDate, getDaysInMonth, getMonth } from "date-fns"
import { emissionsBusPerKM, emissionsCarPerKM, fuelCostCarPerKM } from "./constants"
import LineLayer from "./LineLayer"
import { createBarData, createPerDateData, createTotalData } from "./barChartHelper"

const DistanceBarChart = () => {
  const [barData, setBarData] = useState<BarDatum[]>([])
  const [emissionCarPerDate, setEmissionCarPerDate] = useState<BarDatum[]>([])
  const [emissionCarTotal, setEmissionCarTotal] = useState<BarDatum[]>([])
  const [emissionBusPerDate, setEmissionBusPerDate] = useState<BarDatum[]>([])
  const [emissionBusTotal, setEmissionBusTotal] = useState<BarDatum[]>([])
  const [fuelCostCarPerDate, setFuelCostCarPerDate] = useState<BarDatum[]>([])
  const [fuelCostCarTotal, setFuelCostCarTotal] = useState<BarDatum[]>([])
  const [viewMode, setViewMode] = useState<"day" | "year">("year")
  const [month, setMonth] = useState<string | null>(null)
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  const [highestValue, setHighestValue] = useState<number>(500)
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

  const setData = useCallback((trips: Trip[], transformFunction: CallableFunction) => {
    setBarData(transformFunction(createBarData(trips)))
    setEmissionCarPerDate(transformFunction(createPerDateData(trips, emissionsCarPerKM)))
    setEmissionCarTotal(createTotalData(transformFunction(createPerDateData(trips, emissionsCarPerKM))))
    setEmissionBusPerDate(transformFunction(createPerDateData(trips, emissionsBusPerKM)))
    setEmissionBusTotal(createTotalData(transformFunction(createPerDateData(trips, emissionsBusPerKM))))
    setFuelCostCarPerDate(transformFunction(createPerDateData(trips, fuelCostCarPerKM)))
    setFuelCostCarTotal(createTotalData(transformFunction(createPerDateData(trips, fuelCostCarPerKM))))
  }, [])
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken(true)
        const trips = await tripService.getAllTrips(token as string, year, month)

        if (viewMode === "year") {
          setData(trips, transformDataToMonthly)
        } else if (viewMode === "day") {
          setData(trips, transformDataToDaily)
        }
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }
    fetchData()
  }, [month, transformDataToDaily, user, viewMode, year, setData])

  useEffect(() => {
    if (barData.length === 0 || emissionCarTotal.length === 0) return

    const highestBar = Math.max(...barData.map(bar => Number(bar.value)))
    const highestLinePoint = Number(emissionCarTotal[emissionCarTotal.length - 1].value)
    setHighestValue(Math.max(highestBar, highestLinePoint))
  }, [barData, emissionCarTotal])

  const lineLayer = ({innerHeight, bars, data, color}: LineLayerInfo) => {
    return (
      <LineLayer
        innerHeight={innerHeight}
        bars={bars.map(barData => ({width: barData.width, x: barData.x}))}
        data={data}
        color={color}
        viewMode={viewMode}
        highestValue={highestValue} />
    )
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
        maxValue={highestValue}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Emissions (kg)",
          legendPosition: 'middle',
          legendOffset: 45,
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
          ({innerHeight, bars}) => lineLayer({innerHeight, bars, data: emissionCarPerDate, color: "#55f"}),
          ({innerHeight, bars}) => lineLayer({innerHeight, bars, data: emissionCarTotal, color: "#00f"}),
          ({innerHeight, bars}) => lineLayer({innerHeight, bars, data: emissionBusPerDate, color: "#f00"}),
          ({innerHeight, bars}) => lineLayer({innerHeight, bars, data: emissionBusTotal, color: "#800"}),
          ({innerHeight, bars}) => lineLayer({innerHeight, bars, data: fuelCostCarPerDate, color: "#ae00ff"}),
          ({innerHeight, bars}) => lineLayer({innerHeight, bars, data: fuelCostCarTotal, color: "#62008f"}),
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