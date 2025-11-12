import React from 'react'
import { Link } from 'react-router-dom'
export default function Nav({token,onLogout}){
  return (
    <div style={{padding:10,display:'flex',gap:10}}>
      <Link to="/">produse</Link>
      <Link to="/cart">cos</Link>
      {!token && <Link to="/login">login</Link>}
      {!token && <Link to="/register">register</Link>}
      {token && <button onClick={onLogout}>logout</button>}
    </div>
  )
}
