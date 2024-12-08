import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import userService from "../../services/userService"
import { useEffect, useState } from "react"

const EmployerWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null)
  const [roleLoading, setRoleLoading] = useState(true)

  const { user, loading } = useAuth()

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        try {
          const token = await user.getIdToken(true)
          const roleResponse = await userService.getUserRole(token as string)
          setRole(roleResponse)
        } catch (error) {
          console.error('Error fetching user role:', error)
        } finally {
          setRoleLoading(false)
        }
      } else {
        setRoleLoading(false)
      }
    }
    fetchRole()
  }, [user])

  if (loading || roleLoading || !role) {
    return <div>Loading...</div>
  }

  if (!user || role !== "employer") {
    return <Navigate replace to="/login" />
  }

  return <>{children}</>
}

export default EmployerWrapper