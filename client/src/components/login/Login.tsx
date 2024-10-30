import { useState } from "react"
import { auth, provider } from "../../services/google_authentication"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Navigate } from "react-router-dom"
import Notification from "../notification/Notification"
import { useAuth } from "../../hooks/useAuth"
import stylesLogin from "../login/Login.module.css"
import image from "../../assets/polkupyora_kuva.jpg"

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
      : <div className={stylesLogin['login-container']}>
          <div className={stylesLogin['content-container']}>
            <Notification visible={notification} message={notificationMessage} />
            <div className={stylesLogin['column-left']}>
              <div className={stylesLogin['login form']}>
              <form className={stylesLogin['login-form']} onSubmit={loginUser}>
                <label>email</label>
                <input
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              
                
                <label>password</label>
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
            </div>
            <div className={stylesLogin['column-right']}>
              <img src={image}/>
            </div>
          </div>
        </div>
       
  )
}

export default Login