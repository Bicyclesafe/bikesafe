import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate replace to="/login" />
  }

  return <>{children}</>
}

export default AuthWrapper