import { useState } from "react"
import { auth, provider } from "../../services/google_authentication"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Navigate } from "react-router-dom"
//import Notification from "../notification/Notification"
import { useAuth } from "../../hooks/useAuth"
import stylesLogin from "../login/Login.module.css"
//import image from "../../assets/polkupyora_kuva.jpg"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  //const [notification, setNotification] = useState<boolean>(false)
  //const [notificationMessage, setNotificationMessage] = useState<string>("")
  const { user } = useAuth()

  /*const createNotification = (message: string) => {
    setNotificationMessage(message)
    setNotification(true)
    setTimeout(() => {
      setNotification(false)  
      }, 3000)
    }*/

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
      //createNotification('Invalid user credentials')
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
    :
    <div className={stylesLogin['login-container']}>
      <div className={stylesLogin['content-container']}>
        <div className={stylesLogin['column-left']}>
          <div className={stylesLogin.form}>
            <header>Login</header>
            <form onSubmit={loginUser}>
              <input
                id="email"
                value={email} type="text"
                onChange={handleEmailChange}
                placeholder="Enter your email"
                />
              <input id="password"
                value={password}
                onChange={handlePasswordChange}
                type="password" placeholder="Enter your password" 
                />
              <a href="#">Forgot password?</a>
              <button id='login-button' type="submit" className={stylesLogin.button}>Login</button>
            </form>
            <button onClick={googlePopupLogin}>Google</button>
            <div className={stylesLogin.signup}>
              <span>
                Don't have an account?
                <a href="/register">
                  <label htmlFor="check">Signup</label>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={stylesLogin['column-right']}>
        </div>
      </div>
    </div>
  )}

export default Login