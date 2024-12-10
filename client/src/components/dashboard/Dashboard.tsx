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
    const distance = await addWorkTrip(token as string, trip)
    setDistance(prevDistance => (prevDistance) + distance)  
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
  }, [user])

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

        <div className={stylesDashboard['seasonal-distance']}>
          <div className={stylesDashboard['statistic-title']}>Year Total</div>
          <SeasonalDistance distance={distance} setDistance={setDistance} />
        </div>

        <div className={stylesDashboard['daily-cyclists']}>
          <div className={stylesDashboard['statistic-title']}>Daily Cyclists</div>
          <TotalCommute />
        </div>

        <div className={stylesDashboard['number-of-trips']}>
          <div className={stylesDashboard['statistic-title']}>Number of trips</div>
          <div style={{ fontSize: '2rem' }}>22</div>
        </div>

          <div className={stylesDashboard['distance-overview']}>
            <DistanceOverview distance={distance} />
          </div>

        <div id={stylesDashboard['manual']}>
          <ManualTrips distance={distance} setDistance={setDistance}/>
        </div>

        <div className={stylesDashboard['latest-trips']}>
          <LatestTripsDashboard rawData={rawData} />
        </div>

      </div>
    </div>
  )

  // return (
  //   <div className={stylesDashboard['dashboard-container']}>
  //     <div className={stylesDashboard['dashboard-content']}>
  //       <div className={stylesDashboard['highlight-box']}>
  //         <div className={stylesDashboard['side-area']}>
  //           <div className={stylesDashboard['row']}>
  //             <div className={stylesDashboard['row-item']}>
  //               <div className={stylesDashboard['row-title']}>Year</div>
  //               <div className={stylesDashboard['row-content']}>
  //                   <SeasonalDistance distance={distance} setDistance={setDistance} />
  //               </div>
  //             </div>
  //           </div>
  //           <div className={stylesDashboard['row']}>
  //             <div className={stylesDashboard['row-item']}>
  //               <div className={stylesDashboard['row-content']}>
  //                 <button className={stylesDashboard['row-button']} onClick={cycleToWork}>Cycle to work</button>
  //               </div>
  //             </div>
  //           </div>
  //           <div className={stylesDashboard['row']}>
  //           <NavLink style={{textDecoration: "none"}} to="/commute">
  //             <div className={stylesDashboard['row-item']}>
  //               <div className={stylesDashboard['row-title-wrap']}>Commute distance</div>
  //               <div className={stylesDashboard['row-content']}>
  //                 <CommuteDistance/>
  //               </div>
  //             </div>
  //             </NavLink>
  //           </div>
  //         </div>
  //         <div className={stylesDashboard['center-area']}>
  //           <PersonalGoalTracker yearlyDistance={distance}/>
  //         </div>
  //         <div className={stylesDashboard['side-area']}>
  //           <div className={stylesDashboard['row']}>
  //           <div className={stylesDashboard['row-item']}>
  //               <div className={stylesDashboard['row-title']}>Daily cyclists</div>
  //               <div className={stylesDashboard['row-content']}>
  //                 <TotalCommute/>
  //               </div>
  //             </div>
  //           </div>
  //           <div className={stylesDashboard['row']}>
  //             {getMotivationalQuote()} 
  //           </div>
  //           <div className={stylesDashboard['row']}>Row 3</div>
  //         </div>
  //       </div>
  //       <div className={stylesDashboard['item-container']}>
  //         <NavLink to="/statistics">
  //         <div className={stylesDashboard['item']}>
  //           <DistanceOverview distance={distance} />
  //         </div>
  //         </NavLink>
  //         <div id={stylesDashboard['manual']} className={stylesDashboard['item']}>
  //           <ManualTrips distance={distance} setDistance={setDistance}/>
  //         </div>
  //         <NavLink to="/achievements">
  //         <div className={stylesDashboard['item']}>
  //           <PersonalGoal/>
            
  //         </div>
  //         </NavLink>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default Dashboard