import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"



const Dashboard = () => {
  const { user } = useAuth()

  return (
    user
      ? 
      <div>
        <h1>Dashboard</h1>
      </div>
      : <Navigate replace to="/login" />
    
  )

}

export default Dashboard