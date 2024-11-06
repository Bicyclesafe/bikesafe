import { useAuth } from "../../hooks/useAuth"
import { addTrips } from "../../services/tripService"
import SeasonalDistance from "./SeasonalDistance"

const Dashboard = () => {
  const { user } = useAuth()

  const sendToken = async () => {
    const token = await user?.getIdToken(true)
    console.log(token)
    
      
    addTrips({data: "asratdj"}, token as string)
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