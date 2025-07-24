import { getAuthData, saveAuthData } from '@/utils/auth-storage'
import { createContext, useContext, useEffect, useState } from 'react'

import type { User } from '@/types/auth.type'

interface AuthContextType {
  accessToken: string | null
  user: User | null
  login: (accessToken: string, user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setaccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const login = (accessToken: string, user: User) => {
    setaccessToken(accessToken)
    setUser(user)
    setIsAuthenticated(true)
    saveAuthData(accessToken, user)
  }

  useEffect(() => {
    const { user, accessToken } = getAuthData()
    if (user && accessToken) {
      setaccessToken(accessToken)
      setUser(user)
    }
    setIsAuthenticated(true)
  }, [])

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setaccessToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
