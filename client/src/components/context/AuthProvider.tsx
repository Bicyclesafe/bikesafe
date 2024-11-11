import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { auth } from "../../services/google_authentication"
import { addUser } from "../../services/userService"

interface AuthContextType {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      setUser(user)
    })
    return unsubscribe
  })

  useEffect(() => {
    if (user) {
      // Call the async function once the user state has been set
      (async () => {
        try {
          const token = await user.getIdToken(true)
          console.log('this is token ', token)
          await addUser(token as string);
        } catch (error) {
          console.error('Error adding user to the database:', error);
        }
      })();
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider