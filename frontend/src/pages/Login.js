import React, { useState } from 'react'
import { post } from '../api'
import { useNavigate } from 'react-router-dom'
export default function Login({onLogin}){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const nav = useNavigate()
  return (
    <div style={{padding:20}}>
      <h3>login</h3>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button onClick={async ()=>{
        const r = await post('/auth/login',{email,password})
        if(r.token){ onLogin(r.token); nav('/') }
        else alert('eroare')
      }}>login</button>
    </div>
  )
}
