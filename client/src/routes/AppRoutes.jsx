import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from '../screens/Home'
import Signup from '../screens/Signup'
import Login from '../screens/Login'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
