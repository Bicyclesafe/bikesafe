import { useEffect, useState } from "react"
import { auth, provider } from "../services/google_authentication"
import { signInWithPopup, User } from "firebase/auth"
import { Navigate } from "react-router-dom"

const Login = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    signInWithPopup(auth, provider)
    .then((result) => {
      setUser(result.user)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])
  

  return (
    user ? <Navigate replace to="/" /> : <div>Login</div> 
  )
}

export default Login