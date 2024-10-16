import { useState } from "react"
import { auth, provider } from "../services/google_authentication"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Navigate } from "react-router-dom"
import Notification from "./Notification"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [notification, setNotification] = useState<boolean>(false)
  const [notificationMessage, setNotificationMessage] = useState<string>("")
  const { user } = useAuth()

  const createNotification = (message: string) => {
    setNotificationMessage(message)
    setNotification(true)
    setTimeout(() => {
      setNotification(false)  
      }, 3000)
}

  const googlePopupLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch(error) {
      console.error(error)
    }
  }

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error(error)
      createNotification('Invalid user credentials')
    }

  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }



  return (
    user
      ? <Navigate replace to="/" />
      : <div>
          <Notification visible={notification} message={notificationMessage} />
          <div>
            Login
          </div>
          <form onSubmit={loginUser}>
          email
          <input
            value={email}
            onChange={handleEmailChange}
          />
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Login</button>
        </form>
          <button onClick={googlePopupLogin}>Google</button>
        </div>
  )
}

export default Login