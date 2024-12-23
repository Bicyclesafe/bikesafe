import SeasonalDistance from "./SeasonalDistance"
import stylesDashboard from "./Dashboard.module.css"
import TotalCommute from "./TotalCommute" 
import PersonalGoalTracker from "./PersonalGoalTracker"
import { BaseTrip, Trip } from "../../types"
import tripService, { addWorkTrip } from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import DistanceOverview from "./DistanceOverview"
import { NavLink } from "react-router-dom"
import ManualTrips from "./ManualTrips"
import CommuteDistance from "./CommuteDistance"
import getMotivationalQuote from "./MotivationalQuotes"
import LatestTripsDashboard from "./LatestTripsDashboard"
import AchievementsDashboard from "./AchievementsDashboard"

const Dashboard = () => {
  const [distance, setDistance] = useState<number>(0)
  const [rawData, setRawData] = useState<Trip[]>([])
  const { user } = useAuth()

  const cycleToWork = async () => {
    if (!user) {
      return
    }

    const token = await user.getIdToken(true)

    const trip: BaseTrip = { 
      startTime: new Date(),
      endTime: new Date()
    }
    try {
      const distance = await addWorkTrip(token as string, trip)
      setDistance(prevDistance => (prevDistance) + distance)
    } catch (error) {
      console.error('Error adding work trip:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken(true)
        const trips = await tripService.getAllTrips(token as string)
        setRawData(trips)
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }
    fetchData()
  }, [user, distance])

  if (!rawData) return <div>Loading...</div>

  return (
    <div className={stylesDashboard['dashboard-container']}>
      <div className={stylesDashboard['dashboard-content']}>

        <div className={stylesDashboard['dashboard-title-quote']}>
          <div className={stylesDashboard['dashboard-title']}>Dashboard</div>
          <div className={stylesDashboard['quote']}>{getMotivationalQuote()}</div>
        </div>

        <div className={stylesDashboard['goal-tracker-container']}>
          <div className={stylesDashboard['goal-tracker']}>
            <PersonalGoalTracker yearlyDistance={distance}/>
          </div>
        </div>

        <div className={stylesDashboard['seasonal-distance']}>
          <div className={stylesDashboard['statistic-title']}>Year Total</div>
          <SeasonalDistance distance={distance} setDistance={setDistance} />
        </div>

        <div className={stylesDashboard['number-of-trips']}>
          <div className={stylesDashboard['statistic-title']}>Number of Trips</div>
          <div style={{ fontSize: '2rem' }}>{rawData.length}</div>
        </div>

        <div className={stylesDashboard['daily-cyclists']}>
          <div className={stylesDashboard['statistic-title']}>Daily Cyclists</div>
          <TotalCommute />
        </div>

        <div className={stylesDashboard['commute']}>
          <span className={stylesDashboard['cycle-to-work']}>
            <button className={stylesDashboard['cycle-button']} onClick={cycleToWork}>Cycle to work</button>
          </span>
          <NavLink style={{textDecoration: "none"}} to="/commute">
            <span className={stylesDashboard['commute-distance']}>
              <CommuteDistance/>
            </span>
          </NavLink>
        </div>

        <NavLink to="/statistics" className={stylesDashboard['distance-overview']}>
          <DistanceOverview distance={distance} />
        </NavLink>

        <NavLink className={stylesDashboard['achievements']} to="/achievements">
          <AchievementsDashboard/>
        </NavLink>

        <div id={stylesDashboard['manual']}>
          <ManualTrips distance={distance} setDistance={setDistance}/>
        </div>

        <div className={stylesDashboard['latest-trips']}>
          <LatestTripsDashboard rawData={rawData} />
        </div>

      </div>
    </div>
  )
}

export default Dashboard