import SeasonalDistance from "./SeasonalDistance"
import stylesDashboard from "./Dashboard.module.css"
import PersonalGoal from "./PersonalGoal"
import PersonalGoalTracker from "./PersonalGoalTracker"

const Dashboard = () => {
  return (
    <div className={stylesDashboard['dashboard-container']}>
      <div className={stylesDashboard['seasonal-distance']}>
        <SeasonalDistance />
      </div>
      <div className={stylesDashboard['item-container']}>
        <div className={stylesDashboard['item']}>
          <PersonalGoalTracker/>
        </div>
      </div>
      <div className={stylesDashboard['item-container']}>
        <div className={stylesDashboard['item']}>
          <PersonalGoal/>
        </div>
      </div>
      <div className={stylesDashboard['item-container']}>
        <div className={stylesDashboard['item']}>
          <PersonalGoal/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard