import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Nav from './components/Nav'
export default function App(){
  const [token,setToken] = useState(localStorage.getItem('token'))
  const save = t=>{
    setToken(t)
    if(t) localStorage.setItem('token',t)
    else localStorage.removeItem('token')
  }
  return (
    <>
      <Nav token={token} onLogout={()=>save(null)} />
      <Routes>
        <Route path="/" element={<Products token={token}/>}/>
        <Route path="/login" element={<Login onLogin={save}/>}/>
        <Route path="/register" element={<Register onRegister={save}/>}/>
        <Route path="/cart" element={<Cart token={token}/>}/>
      </Routes>
    </>
  )
}
