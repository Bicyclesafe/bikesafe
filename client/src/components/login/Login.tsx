import { useState } from "react"
import { auth, provider } from "../../services/google_authentication"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Navigate } from "react-router-dom"
//import Notification from "../notification/Notification"
import { useAuth } from "../../hooks/useAuth"
import stylesLogin from "../login/Login.module.css"
import image from "../../assets/polkupyora_kuva.jpg"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
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

  const handleErrorMessage = (message : string) => {
    setErrorMessage(message)
  }

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: unknown) {
      if (error instanceof Error) {
      console.error(error.message)
      if (error.message == "Firebase: Error (auth/invalid-credential).") {
        handleErrorMessage("Invalid email or password")
      }
      if (error.message == "Firebase: Error (auth/invalid-email).") {
        handleErrorMessage("Please provide a valid email")
      }
      if (error.message == "Firebase: Error (auth/missing-password).") {
        handleErrorMessage("Please provide a password")
      }      
    }
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
    ? <Navigate replace to="/dashboard" />
    :
    <div className={stylesLogin['login-container']}>
      <div className={stylesLogin['content-container']}>
        <div className={stylesLogin['column-left']}>
          <div className={stylesLogin.form}>
            <header>Login</header>
            {errorMessage && 
            <div className={stylesLogin['error-wrapper']}>
            <div className={stylesLogin['error-notification']}>{errorMessage}</div></div>}
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
            <div className={stylesLogin['divider']}>OR</div>
            <button className={stylesLogin['google-button']}onClick={googlePopupLogin}>Login with Google</button>
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
          <img src={image}/>
        </div>
      </div>
    </div>
  )}

export default Login