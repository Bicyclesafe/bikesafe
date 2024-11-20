import { BarDatum, ResponsiveBar } from "@nivo/bar"
import { useEffect, useState } from "react"
import tripService from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { Trip } from "../../types"
import { linearGradientDef } from "@nivo/core"

const DistanceOverview = () => {
  const [data, setData] = useState<BarDatum[] | []>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken(true)
        const year = new Date().getFullYear().toString()
        const trips = await tripService.getAllTrips(token as string, year)
        setData(transformDataToMonthly(trips))
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }
    fetchData()
  }, [user])

  const transformDataToMonthly = (trips: Trip[]) => {
    const monthlyData = Array.from({ length: 12 }, (_, month) => ({
      month: new Date(0, month).toLocaleString('default', { month: 'short' }),
      distance: 0,
    }))

    trips.forEach((trip: Trip) => {
      const month = new Date(trip.startTime).getMonth()
      monthlyData[month].distance += Number(trip.tripDistance.toFixed(0))
    })

    return monthlyData
  }

  return (
    <div style={{ height: '100%' }}>
      <ResponsiveBar
        data={data}
        keys={['distance']}
        indexBy="month"
        enableLabel={false}
        margin={{ top: 50, right: 60, bottom: 50, left: 70 }}
        padding={0.3}
        colors={{ scheme: 'dark2' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionConfig="stiff"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: value => value.charAt(0),
        }}
        defs={[
          linearGradientDef('gradientCompleted', [
            { offset: 0, color: '#66e375' },
            { offset: 100, color: '#4ea8ed' },
          ]),
          linearGradientDef('gradientRemaining', [
            { offset: 0, color: '#ffc821', opacity: 0.6 },
            { offset: 100, color: '#ff4545', opacity: 0.6 },
          ]),
        ]}
        fill={[
          { match: { id: 'distance' }, id: 'gradientCompleted' },
        ]}
      />
    </div>
  )
}
  
export default DistanceOverview