'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('mock-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple validation
    if (email.includes('@') && password.length >= 6) {
      const mockUser = { id: '1', email }
      setUser(mockUser)
      localStorage.setItem('mock-user', JSON.stringify(mockUser))
      setLoading(false)
      return { success: true }
    } else {
      setLoading(false)
      return { success: false, error: 'Invalid email or password' }
    }
  }

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple validation
    if (email.includes('@') && password.length >= 6) {
      const mockUser = { id: '1', email }
      setUser(mockUser)
      localStorage.setItem('mock-user', JSON.stringify(mockUser))
      setLoading(false)
      return { success: true }
    } else {
      setLoading(false)
      return { success: false, error: 'Invalid email or password' }
    }
  }

  const signOut = async () => {
    setLoading(true)
    setUser(null)
    localStorage.removeItem('mock-user')
    setLoading(false)
    return { success: true }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


