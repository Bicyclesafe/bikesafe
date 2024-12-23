import { BarCustomLayer, BarDatum, ComputedDatum, ResponsiveBar } from "@nivo/bar"
import { useCallback, useEffect, useState, FC } from "react"
import { ChartData, LineLayerInfo, Trip, Filters } from "../../types"
import { getDate, getDaysInMonth, getMonth } from "date-fns"
import { emissionsBusPerKM, emissionsCarPerKM, fuelCostCarPerKM } from "../../../../shared/constants"
import LineLayer from "./LineLayer"
import { createBarData, createPerDateData, createTotalData } from "./barChartHelper"
import styles from "./DistanceBarChart.module.css"

const DistanceBarChart: FC<{ rawData: Trip[], year: string, filters: Filters }> = ({ rawData, year, filters }) => {
  const [barData, setBarData] = useState<BarDatum[]>([])
  const [emissionCarPerDate, setEmissionCarPerDate] = useState<BarDatum[]>([])
  const [emissionCarTotal, setEmissionCarTotal] = useState<BarDatum[]>([])
  const [emissionBusPerDate, setEmissionBusPerDate] = useState<BarDatum[]>([])
  const [emissionBusTotal, setEmissionBusTotal] = useState<BarDatum[]>([])
  const [fuelCostCarPerDate, setFuelCostCarPerDate] = useState<BarDatum[]>([])
  const [fuelCostCarTotal, setFuelCostCarTotal] = useState<BarDatum[]>([])
  const [viewMode, setViewMode] = useState<"day" | "year">("year")
  const [month, setMonth] = useState<string | null>(null)
  const [highestValue, setHighestValue] = useState<number>(500)

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
  

  const transformDataToMonthly = useCallback((data: ChartData[]) => {
    const monthlyData = Array.from({ length: 12 }, (_, month) => ({
      monthName: new Date(0, month).toLocaleString('default', { month: 'short' }),
      value: 0,
      monthNumber: month + 1
    }))
    
    data.forEach(({time, value}) => {
      const month = new Date(time).getMonth()
      monthlyData[month].value += value
    })
              
    monthlyData.forEach((data) => {
      data.value = parseFloat(data.value.toFixed(1))
    })

    return monthlyData
  }, [])

  
  const transformDataToDaily = useCallback((data: ChartData[]) => {
    if (!month) {
      return []
    }
    
    const daysInMonth = getDaysInMonth(new Date(parseInt(year), parseInt(month) - 1))
    const dailyData = Array.from({ length: daysInMonth }, (_, day) => ({
      day: (day + 1).toString(),
      value: 0,
    }))
    
    data.forEach(({time, value}) => {
      if (getMonth(time) + 1 === Number(month)) {
        const day = getDate(time) - 1
        dailyData[day].value += value
      }
    })

    dailyData.forEach((data) => {
      data.value = parseFloat(data.value.toFixed(1))
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
    const filteredTrips = rawData.filter(
      (trip) => new Date(trip.startTime).getFullYear() === Number(year)
    )
    if (viewMode === "year") {
      setData(filteredTrips, transformDataToMonthly)
    } else if (viewMode === "day" && month) {
      setData(filteredTrips, transformDataToDaily)
    }
  }, [month, transformDataToDaily, transformDataToMonthly, viewMode, year, setData, rawData])

  useEffect(() => {
    if (barData.length === 0 || emissionCarTotal.length === 0) return
  
    const activeDataTypes = [
      emissionCarPerDate, emissionCarTotal, emissionBusPerDate,
      emissionBusTotal, fuelCostCarPerDate, fuelCostCarTotal
    ].filter((_, i) =>
      filters[Object.keys(filters)[i]]?.isChecked
    )
  
    const flattenedData = activeDataTypes.reduce<BarDatum[]>((acc, dataset) => acc.concat(dataset), [])
  
    const highestBar = Math.max(...barData.map((bar) => Number(bar.value)))
    const highestLinePoint = Math.max(...flattenedData.map((data) => Number(data.value)))
  
    setHighestValue(Math.max(highestBar, highestLinePoint))
  }, [barData, emissionCarTotal, emissionBusTotal, fuelCostCarTotal, filters, emissionCarPerDate, emissionBusPerDate, fuelCostCarPerDate])
  
  

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

  const filterLayers = (): BarCustomLayer<BarDatum>[] => {
    const layers: BarCustomLayer<BarDatum>[] = []
    const dataTypes = [emissionCarPerDate, emissionCarTotal, emissionBusPerDate, emissionBusTotal, fuelCostCarPerDate, fuelCostCarTotal] 
    const lineColors = ["#03befc", "#00f", "#f00", "#800", "#ae00ff", "#62008f"]

    for (const key in filters) {
      if (filters[key]?.isChecked) {
        const i = Object.keys(filters).indexOf(key)
        layers.push(({ bars, innerHeight }) =>
          lineLayer({ innerHeight, bars, data: dataTypes[i], color: lineColors[i] })
        )
      }
    }
  
    return layers
  }
    
  if (!rawData || rawData.length === 0) {
    return <div>No data available for {year}</div>
  }

  return (

    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
      {month &&
      <div className={styles['return-container']}>
        <button onClick={() => { setMonth(null); setViewMode("year") }}>
          &larr; Return
        </button>
      </div>
      }
      <ResponsiveBar
        data={barData}
        keys={['value']}
        indexBy={getNivoBarSettings(viewMode).index}
        enableLabel={false}
        margin={{ top: 50, right: 85, bottom: 50, left: 85 }}
        padding={0.3}
        colors={{ scheme: 'dark2' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        maxValue={highestValue}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Emissions (kg) / Fuel cost (€)",
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
          ...filterLayers()]}
      />
    </div>
  )
}
  
export default DistanceBarChart