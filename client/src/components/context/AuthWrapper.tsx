import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const AuthWrapper = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate replace to="/login" />
  }

  return <Outlet />
} 


export default AuthWrapper