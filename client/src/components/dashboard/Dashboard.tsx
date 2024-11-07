import { useAuth } from "../../hooks/useAuth"
import SeasonalDistance from "./SeasonalDistance"

const Dashboard = () => {
  const { user } = useAuth()

  const sendToken = async () => {
    const token = await user?.getIdToken(true)
    console.log(token)
  }
  sendToken()
  return (
    <div>
      <h1>Dashboard</h1>
      <SeasonalDistance />
    </div>
  )
}

export default Dashboard