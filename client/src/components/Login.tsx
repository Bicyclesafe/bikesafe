import { useState } from "react"
import { auth, provider } from "../services/google_authentication"
import { signInWithPopup, User } from "firebase/auth"
import { Navigate } from "react-router-dom"

const Login = () => {
  const [user, setUser] = useState<User | null>(null)

  const googlePopupLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
    } catch(error) {
      console.error(error)
    }
  }

  const emailLogin = () => {
    return
  }

  return (
    user
      ? <Navigate replace to="/" />
      : <div>
          <div>
            Login
          </div>
          <button onClick={googlePopupLogin}>Google</button>
          <button onClick={emailLogin}>Email</button>
        </div>
  )
}

export default Login