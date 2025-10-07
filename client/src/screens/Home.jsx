import React from 'react'
import { useAuth } from '../context/AuthProvider'

const Home = () => {
  const [authuser,setAuthUser]=useAuth();
  const data=JSON.stringify(authuser)
  return (
    <div>
      <h1>hello</h1>
      
      {data}
      
    </div>
  )
}

export default Home
