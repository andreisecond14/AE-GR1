const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'secret123'
module.exports = (req,res,next)=>{
  const auth = req.headers.authorization
  if(!auth) return res.status(401).json({error:'no token'})
  const token = auth.split(' ')[1]
  try{
    const payload = jwt.verify(token,secret)
    req.user = payload
    next()
  }catch(e){
    return res.status(401).json({error:'invalid token'})
  }
}
