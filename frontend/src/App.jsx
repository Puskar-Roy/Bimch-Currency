
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Online from './components/OnlineUsers/Online'
import Profile from './components/Profile/Profile'
import Update from './components/Profile/Update'

import { Routes , Route } from 'react-router-dom'
function App() {


  return (
    <>
    <Navbar/>
    <Routes>
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'/register'} element={<Register/>}/>
      <Route path={'/activeUsers'} element={<Online/>}/>
      <Route path={'/profile'} element={<Profile/>}/>
      <Route path={'/update'} element={<Update/>}/>
    </Routes>
    </>
  )
}

export default App
