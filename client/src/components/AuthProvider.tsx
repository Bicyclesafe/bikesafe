import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { auth } from "../services/google_authentication"

interface AuthContextType {
  user: User | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return unsubscribe
  })

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider