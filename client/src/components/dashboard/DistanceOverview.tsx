import { BarDatum, ResponsiveBar } from "@nivo/bar"
import { FC, useEffect, useState } from "react"
import tripService from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { Trip } from "../../types"
import { linearGradientDef } from "@nivo/core"
import { startOfWeek, endOfWeek } from "date-fns"
import styles from "./DistanceOverview.module.css"
import statsIcon from "../../assets/evaluation.png"
import { IconButton } from "@mui/material"
import { KeyboardArrowRight } from "@mui/icons-material"

const DistanceOverview: FC<{ distance: number }> = ({ distance = 0 }) => {
  const [data, setData] = useState<BarDatum[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken(true)
        const startTime = startOfWeek(new Date(), {weekStartsOn:1})
        const endTime = endOfWeek(new Date(), {weekStartsOn: 1})
        const trips = await tripService.getTripsBetweenDates(token as string, startTime, endTime) || []
        if (trips.length !== 0 ) {
          setData(transformDataToWeekly(trips))
        }
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }
    fetchData()
  }, [user, distance])


  const transformDataToWeekly = (trips: Trip[]) => {
    const weeklyData = Array.from({ length: 7 }, (_, day) => ({
      day: new Date(2023, 0, 2 + day).toLocaleString('default', { weekday: 'short' }),
      distance: 0,
    }))
  
    trips.forEach((trip: Trip) => {
      let day = new Date(trip.startTime).getDay() - 1// Sunday is 0, Monday is 1, ..., Saturday is 6
      if (day < 0) day = 6
      weeklyData[day].distance += trip.tripDistance
    })

    weeklyData.forEach((data) => {
      data.distance = parseFloat(data.distance.toFixed(1))
    })
  
    return weeklyData
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className={styles['container']}>
        <IconButton
          style={{
            position: "absolute",
            top: "0.8rem",
            right: "0.5rem",
            zIndex: 10,
          }}
        >
          <KeyboardArrowRight />
        </IconButton>
        <div className={styles['text-container']}>
          <header className={styles['header']}>
            Statistics
          </header>
          <div>
            No weekly data available
          </div>
        </div>
        <img src={statsIcon} className={styles['statsIcon']}/>
      </div>
    )
  }


  return (
    <div className={styles['absoluteWrapper']}>
      <IconButton
        style={{
          position: "absolute",
          top: "0.8rem",
          right: "0.5rem",
          zIndex: 10,
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
      <div className={styles['relativeContainer']}>
        <header className={styles['statsHeader']}>Weekly Distances</header>
        <ResponsiveBar
          data={data}
          keys={['distance']}
          indexBy="day"
          enableLabel={false}
          margin={{ top: 70, right: 60, bottom: 50, left: 70 }}
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
    </div>
  )
}
  
export default DistanceOverview