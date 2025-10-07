
import React, { createContext, useContext, useState } from 'react'


export const AuthContext=createContext();
export const AuthProvider = ({children}) => {

  const initialAuthstate=localStorage.getItem('app')

  const [authuser,setAuthUser]=useState(initialAuthstate?JSON.parse(initialAuthstate):null)

  return (
  <AuthContext.Provider value={[authuser,setAuthUser]}>
    {children}
  </AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext)
