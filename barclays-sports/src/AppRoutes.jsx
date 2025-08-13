import React from 'react'
import { Link, Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Auth/Login'
import Registration from './components/Auth/Register'
import Footer from './components/Footer'

function AppRoutes() {


   
  return (
    <div>
      {/* <Link to='/'>Home</Link> */}
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Registration' element={<Registration/>}/>
        <Route path='/Footer' element={<Footer/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes
