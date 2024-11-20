import SeasonalDistance from "./SeasonalDistance"
import stylesDashboard from "./Dashboard.module.css"
import PersonalGoal from "./PersonalGoal"
import PersonalGoalTracker from "./PersonalGoalTracker"
import { Trip } from "../../types"
import { addTrip } from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const Dashboard = () => {
  const [distance, setDistance] = useState<number>(0)
  const { user } = useAuth()

  const cycleToWork = async () => {
    if (!user) {
      return
    }

    const token = await user.getIdToken(true)

    const trip: Trip = { 
      startTime: new Date(),
      endTime: new Date()
    }
    const distance = await addTrip(token as string, trip)
    setDistance(prevDistance => (prevDistance) + distance)  
    }

  return (
    <div className={stylesDashboard['dashboard-container']}>
      <div className={stylesDashboard['dashboard-content']}>
        <div className={stylesDashboard['seasonal-distance']}>
          <SeasonalDistance distance={distance} setDistance={setDistance}/>
          <button onClick={cycleToWork}>Cycle to work</button>
        </div>
        <NavLink to="/">
          <div className={stylesDashboard['item-container']}>
            <div className={stylesDashboard['item']}>
              <PersonalGoalTracker/>
            </div>
          </div>
        </NavLink>
        <NavLink to="/">
          <div className={stylesDashboard['item-container']}>
            <div className={stylesDashboard['item']}>
              <PersonalGoal/>
            </div>
          </div>
        </NavLink>
        <NavLink to="/">
        <div className={stylesDashboard['item-container']}>
          <div className={stylesDashboard['item']}>
            <PersonalGoal/>
          </div>
        </div>
        </NavLink>
      </div>
    </div>
  )
}

export default Dashboard