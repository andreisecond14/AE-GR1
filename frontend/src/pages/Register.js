import React, { useState } from 'react'
import { post } from '../api'
import { useNavigate } from 'react-router-dom'
export default function Register({onRegister}){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const nav = useNavigate()
  return (
    <div style={{padding:20}}>
      <h3>register</h3>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button onClick={async ()=>{
        await post('/auth/register',{email,password})
        const r = await post('/auth/login',{email,password})
        if(r.token){ onRegister(r.token); nav('/') }
      }}>register</button>
    </div>
  )
}
