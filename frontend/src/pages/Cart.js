import React, { useEffect, useState } from 'react'
import { get, put, del } from '../api'
export default function Cart({token}){
  const [items,setItems] = useState([])
  useEffect(()=>{ if(token) get('/cart',token).then(setItems) },[token])
  const refresh = ()=>{ if(token) get('/cart',token).then(setItems) }
  if(!token) return <div style={{padding:20}}>te rugam sa te loghezi</div>
  return (
    <div style={{padding:20}}>
      <h3>cos</h3>
      <div>
        {items.map(i=>(
          <div key={i.id} style={{border:'1px solid #ddd',padding:10,marginBottom:8}}>
            <div>{i.Product?.name || 'produs'} - {i.Product?.price} lei</div>
            <div>cantitate: <input type="number" value={i.quantity} onChange={e=>{ const q = parseInt(e.target.value)||1; put('/cart/'+i.id,{quantity:q},token).then(refresh) }}/></div>
            <div><button onClick={async ()=>{ await del('/cart/'+i.id,token); refresh() }}>sterge</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
