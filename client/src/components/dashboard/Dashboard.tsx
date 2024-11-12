import SeasonalDistance from "./SeasonalDistance"
import stylesDashboard from "./Dashboard.module.css"
import PersonalGoal from "./PersonalGoal"
import PersonalGoalTracker from "./PersonalGoalTracker"

const Dashboard = () => {
  return (
    <div className={stylesDashboard['dashboard-container']}>
      <div className={stylesDashboard['content-container']}>
        <div>
          <h1>Dashboard</h1>
          <SeasonalDistance />
        </div>
        <div className={stylesDashboard['component-container']}>
          <div className={stylesDashboard['row-container']}>
            <div className={stylesDashboard['item-left']}>
              <PersonalGoalTracker/>
            </div>
            <div className={stylesDashboard['item-right']}>
              <PersonalGoal/>
            </div>
          </div>
          <div className={stylesDashboard['row-container']}>
            <div className={stylesDashboard['item-left']}>
              <PersonalGoal/>
            </div>
            <div className={stylesDashboard['item-right']}>
              <PersonalGoal/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard