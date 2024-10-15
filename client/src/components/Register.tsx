import { useState } from "react"
import { auth } from "../services/google_authentication"
import { createUserWithEmailAndPassword } from "firebase/auth"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch(error) {
      console.error(error)
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }

  return (
    <div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register