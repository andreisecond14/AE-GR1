import React, { useEffect, useState } from 'react'
import { get, post } from '../api'
export default function Products({token}){
  const [products,setProducts] = useState([])
  useEffect(()=>{ get('/products').then(setProducts) },[])
  return (
    <div style={{padding:20}}>
      <h3>produse</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
        {products.map(p=>(
          <div key={p.id} style={{border:'1px solid #ccc',padding:10}}>
            <div>{p.name}</div>
            <div>{p.description}</div>
            <div>{p.price} lei</div>
            <button onClick={async ()=>{
              if(!token){ return alert('te rugam sa te loghezi') }
              await post('/cart/add',{productId:p.id,quantity:1},token)
              alert('adaugat')
            }}>adauga in cos</button>
          </div>
        ))}
      </div>
    </div>
  )
}
