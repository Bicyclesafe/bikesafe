import { useState } from "react"
import { auth, provider } from "../../services/google_authentication"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import stylesLogin from "../login/Login.module.css"
import image from "../../assets/polkupyora_kuva.jpg"
import icon from "../../assets/google_icon.png"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { user } = useAuth()

  const googlePopupLogin = async () => {
    try {
      await signInWithPopup(auth, provider)

    } catch(error) {
      console.error(error)
    }
  }

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fieldErrors: { [key: string]: string } = {}
    let formIsValid = true

    if (!formIsValid) {
      setErrors(fieldErrors)
      return
    }

    if (!password) {
      fieldErrors.password = 'Password is required'
      formIsValid = false
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: unknown) {
      if (error instanceof Error) {
      console.error(error.message)
      if (error.message == "Firebase: Error (auth/invalid-credential).") {
        fieldErrors.invalid = "Invalid email or password"
        formIsValid = false
      }
      if (error.message == "Firebase: Error (auth/invalid-email).") {
        fieldErrors.email = "Invalid email"
        formIsValid = false
      }
      if (error.message == "Firebase: Error (auth/missing-password).") {
        fieldErrors.password = "Please fill-in the passowrd"
        formIsValid = false
      }      
    }
    setErrors(fieldErrors)
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
            <form onSubmit={loginUser}>
              <div className={stylesLogin.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  value={email} type="text"
                  onChange={handleEmailChange}
                  className={errors.email ? stylesLogin.errorInput : ''}
                />
                {errors.email && <span className={stylesLogin.errorMessage}>{errors.email}</span>}
              </div>
              <div className={stylesLogin.inputGroup}>
                <label htmlFor="password">Password</label>
                <input 
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  type="password" 
                  className={errors.password ? stylesLogin.errorInput : ''}
                />
                {errors.password && <span className={stylesLogin.errorMessage}>{errors.password}</span>}
              </div>
              <button id='login-button' type="submit" className={stylesLogin.button}>Login</button>
            </form>
            <div className={stylesLogin['divider']}>Or</div>
            <button className={stylesLogin['google-button']}onClick={googlePopupLogin}>
              <img src={icon}/>
              Login with Google
            </button>
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