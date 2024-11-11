import { useState } from "react"
import { auth } from "../../services/google_authentication"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import styles from './Register.module.css'
import { FirebaseError } from "firebase/app"
import emailValidator from "email-validator"


const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { user } = useAuth()

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fieldErrors: { [key: string]: string } = {}
    let formIsValid = true

    if (password !== passwordConfirm) {
      fieldErrors.passwordConfirm = "Passwords don't match"
      formIsValid = false
      }

    if (password.length < 6) {
      fieldErrors.password = 'Password must be at least 6 characters long'
      formIsValid = false
    }

    if (!passwordConfirm) {
      fieldErrors.passwordConfirm = 'Password confirmation is required'
      formIsValid = false
    }

    if (!emailValidator.validate(email)) {
      fieldErrors.email = 'Email is invalid'
      formIsValid = false
    }

    if (!formIsValid) {
      setErrors(fieldErrors)
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      console.log('Account created successfully!')
    } catch(error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          fieldErrors.email = 'Email is already in use'
        } else {
          fieldErrors.general = 'An unexpected error occurred'
        }
      } else {
        fieldErrors.general = 'An unexpected error occurred, please try again.'
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

  const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.currentTarget.value)
  }

  return (
    user
      ? 
      <Navigate replace to="/login" />
      :  
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Sign up</h1>
          {errors.general && <div className={styles.errorGeneral}>{errors.general}</div>}
          <form onSubmit={registerUser}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <span>*</span>
              <input
                id="email"
                value={email}
                onChange={handleEmailChange}
                type="text"
                className={errors.email ? styles.errorInput : ''}
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <span>*</span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={errors.password ? styles.errorInput : ''}
              />
              {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="passwordConfirm">Password Confirmation</label>
              <span>*</span>
              <input
                id="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                className={errors.passwordConfirm ? styles.errorInput : ''}
              />
              {errors.passwordConfirm && <span className={styles.errorMessage}>{errors.passwordConfirm}</span>}
            </div>

            <button type="submit" id="register-button">Sign up</button>
          </form>

          <div className={styles.login}>
            <p>Already have an account? <a href="/login">Log In</a></p>
          </div>
        </div>
      </div>
  )
}
export default Register
