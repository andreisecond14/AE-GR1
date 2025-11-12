const API = 'http://localhost:4000/api'
export async function post(path,body,token){
  const res = await fetch(API+path,{method:'POST',headers:{'content-type':'application/json', ...(token?{authorization:'bearer '+token}: {})},body:JSON.stringify(body)})
  return res.json()
}
export async function get(path,token){
  const res = await fetch(API+path,{headers:{ ...(token?{authorization:'bearer '+token}: {})}})
  return res.json()
}
export async function put(path,body,token){
  const res = await fetch(API+path,{method:'PUT',headers:{'content-type':'application/json', ...(token?{authorization:'bearer '+token}: {})},body:JSON.stringify(body)})
  return res.json()
}
export async function del(path,token){
  const res = await fetch(API+path,{method:'DELETE',headers:{ ...(token?{authorization:'bearer '+token}: {})}})
  return res.json()
}
