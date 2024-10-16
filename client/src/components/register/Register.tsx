import { useState } from "react"
import { auth } from "../../services/google_authentication"
import { createUserWithEmailAndPassword } from "firebase/auth"
import Notification from "../notification/Notification"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")
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

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (password !== passwordConfirm) {
        createNotification('Password and password confirmation do not match')
        return 
      }
      
      else if (password.length < 6) {
        createNotification('Minimum length for password is 6 characters')
        return
      }

      await createUserWithEmailAndPassword(auth, email, password)
      createNotification('User has been created!')

    } catch(error) {
      console.error(error)
      createNotification('Make sure you are using a correctly formatted email and password')
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }

  const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.currentTarget.value)
  }

  return (
    user
      ? 
      <Navigate replace to="/login" />
      :  
      <div>
        <Notification visible={notification} message={notificationMessage}/>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
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
          password confirmation
          <input
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
  )
}

export default Register