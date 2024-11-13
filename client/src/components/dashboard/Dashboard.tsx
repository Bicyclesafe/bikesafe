import SeasonalDistance from "./SeasonalDistance"
import stylesDashboard from "./Dashboard.module.css"
import PersonalGoal from "./PersonalGoal"
import PersonalGoalTracker from "./PersonalGoalTracker"
import { Trip } from "../../types"
import { addTrip } from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"

const Dashboard = () => {
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
    await addTrip(token as string, trip)
  }

  return (
      <div className={stylesDashboard['content-container']}>
        <div>
          <h1>Dashboard</h1>
          <SeasonalDistance />
          <button onClick={cycleToWork}>Cycle to work</button>
        </div>
        <div className={stylesDashboard['component-container']}>
          <div className={stylesDashboard['row-container']}>
            <div className={stylesDashboard['item-left']}>
              <PersonalGoalTracker/>
            </div>
            <div className={stylesDashboard['item-right']}>
              <PersonalGoal/>
            </div>
            <div className={stylesDashboard['item-right']}>
              <PersonalGoal/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Dashboard