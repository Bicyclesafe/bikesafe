import { useAuth } from "../../hooks/useAuth"
import { addTrips } from "../../services/tripService"

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
    </div>
  )
}

export default Dashboard