import { useAuth } from "../../hooks/useAuth"
import { getTrips } from "../../services/tripService"

const Dashboard = () => {
  const { user } = useAuth()

  const sendToken = async () => {
    const token = await user?.getIdToken(true)
    console.log(token)
    getTrips(token as string)
  }
  sendToken()
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard