import { useState } from "react"
import { auth, provider } from "../services/google_authentication"
import { signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth"
import { Navigate } from "react-router-dom"
import Notification from "./Notification"

const Login = () => {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [notification, setNotification] = useState<boolean>(false)
  const [notificationMessage, setNotificationMessage] = useState<string>("")

  const createNotification = (message: string) => {
    setNotificationMessage(message)
    setNotification(true)
    setTimeout(() => {
      setNotification(false)  
      }, 3000)
}

  const googlePopupLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
    } catch(error) {
      console.error(error)
    }
  }

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
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
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button id="login-button" type="submit">Login</button>
        </form>
          <button onClick={googlePopupLogin}>Google</button>
        </div>
  )
}

export default Login