import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthProvider'

const App = () => {
  return (
    <>
    <AuthProvider>
       <AppRoutes />
      <Toaster position="top-right" />  
    </AuthProvider>
      
      
    </>
  )
}

export default App
