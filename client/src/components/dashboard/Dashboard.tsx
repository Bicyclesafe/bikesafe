import SeasonalDistance from "./SeasonalDistance"
import stylesDashboard from "./Dashboard.module.css"
import PersonalGoal from "./PersonalGoal"
import PersonalGoalTracker from "./PersonalGoalTracker"

const Dashboard = () => {
  return (
    <div className={stylesDashboard['content-container']}>
      <div className={stylesDashboard['top-element']}>
        <h1>Dashboard</h1>
        <SeasonalDistance />
      </div>
        <div className={stylesDashboard['row-container']}>
          <div className={stylesDashboard['item']}>
            <PersonalGoalTracker/>
          </div>
          <div className={stylesDashboard['item']}>
            <PersonalGoal/>
          </div>
          <div className={stylesDashboard['item']}>
            <PersonalGoal/>
          </div>
        </div>
    </div>
  )
}

export default Dashboard