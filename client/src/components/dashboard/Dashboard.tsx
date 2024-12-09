import SeasonalDistance from "./SeasonalDistance"
import stylesDashboard from "./Dashboard.module.css"
import PersonalGoal from "./PersonalGoal"
import TotalCommute from "./TotalCommute" 
import PersonalGoalTracker from "./PersonalGoalTracker"
import { BaseTrip } from "../../types"
import { addWorkTrip } from "../../services/tripService"
import { useAuth } from "../../hooks/useAuth"
import { useState } from "react"
import DistanceOverview from "./DistanceOverview"
import { NavLink } from "react-router-dom"
import ManualTrips from "./ManualTrips"
import CommuteDistance from "./CommuteDistance"


const Dashboard = () => {
  const [distance, setDistance] = useState<number>(0)
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
    const distance = await addWorkTrip(token as string, trip)
    setDistance(prevDistance => (prevDistance) + distance)  
  }

  return (
    <div className={stylesDashboard['dashboard-container']}>
      <div className={stylesDashboard['dashboard-content']}>
        <div className={stylesDashboard['highlight-box']}>
          <div className={stylesDashboard['side-area']}>
            <div className={stylesDashboard['row']}>
              <div className={stylesDashboard['row-item']}>
                <div className={stylesDashboard['row-title']}>Year</div>
                <div className={stylesDashboard['row-content']}>
                    <SeasonalDistance distance={distance} setDistance={setDistance} />
                </div>
              </div>
            </div>
            <div className={stylesDashboard['row']}>
              <div className={stylesDashboard['row-item']}>
                <div className={stylesDashboard['row-content']}>
                  <button className={stylesDashboard['row-button']} onClick={cycleToWork}>Cycle to work</button>
                </div>
              </div>
            </div>
            <div className={stylesDashboard['row']}>
            <NavLink style={{textDecoration: "none"}} to="/commute">
              <div className={stylesDashboard['row-item']}>
                <div className={stylesDashboard['row-title-wrap']}>Commute distance</div>
                <div className={stylesDashboard['row-content']}>
                  <CommuteDistance/>
                </div>
              </div>
              </NavLink>
            </div>
          </div>
          <div className={stylesDashboard['center-area']}>
            <PersonalGoalTracker yearlyDistance={distance}/>
          </div>
          <div className={stylesDashboard['side-area']}>
            <div className={stylesDashboard['row']}>
            <div className={stylesDashboard['row-item']}>
                <div className={stylesDashboard['row-title']}>Daily cyclists</div>
                <div className={stylesDashboard['row-content']}>
                  <TotalCommute/>
                </div>
              </div>
            </div>
            <div className={stylesDashboard['row']}>Row 2</div>
            <div className={stylesDashboard['row']}>Row 3</div>
          </div>
        </div>
        <div className={stylesDashboard['item-container']}>
          <NavLink to="/statistics">
          <div className={stylesDashboard['item']}>
            <DistanceOverview distance={distance} />
          </div>
          </NavLink>
          <div id={stylesDashboard['manual']} className={stylesDashboard['item']}>
            <ManualTrips distance={distance} setDistance={setDistance}/>
          </div>
          <NavLink to="/achievements">
          <div className={stylesDashboard['item']}>
            <PersonalGoal/>
            
          </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Dashboard