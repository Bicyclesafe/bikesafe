import { useState } from "react"
import { auth } from "../services/google_authentication"
import { createUserWithEmailAndPassword } from "firebase/auth"
import Notification from "./Notification"

const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")
  const [notification, setNotification] = useState<boolean>(false)
  const [notificationMessage, setNotificationMessage] = useState<string>("")

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (password !== passwordConfirm) {
        setNotificationMessage('Password and password confirmation do not match')
        setNotification(true)
        setTimeout(() => {
          setNotification(false)  
        }, 3000);
        return 
      }
      
      else if (password.length < 6) {
        setNotificationMessage('Minimum length for password is 6 characters')
        setNotification(true)
        setTimeout(() => {
          setNotification(false)  
        }, 3000);
        return
      }

      await createUserWithEmailAndPassword(auth, email, password)
      setNotificationMessage('User has been created!')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)  
      }, 3000);

    } catch(error) {
      console.error(error)
      setNotificationMessage('Make sure you are using a correctly formatted email and password')
      setNotification(true)
      setTimeout(() => {
        setNotification(false)  
      }, 3000);
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