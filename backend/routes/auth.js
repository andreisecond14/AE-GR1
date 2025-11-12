const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const secret = process.env.JWT_SECRET || 'secret123'
router.post('/register',async(req,res)=>{
  const { email, password } = req.body
  if(!email||!password) return res.status(400).json({error:'missing'})
  const existing = await User.findOne({ where:{ email } })
  if(existing) return res.status(400).json({error:'exists'})
  const hash = await bcrypt.hash(password,10)
  const user = await User.create({ email, password:hash })
  return res.json({ id:user.id, email:user.email })
})
router.post('/login',async(req,res)=>{
  const { email, password } = req.body
  if(!email||!password) return res.status(400).json({error:'missing'})
  const user = await User.findOne({ where:{ email } })
  if(!user) return res.status(400).json({error:'invalid'})
  const ok = await bcrypt.compare(password,user.password)
  if(!ok) return res.status(400).json({error:'invalid'})
  const token = jwt.sign({ id:user.id, email:user.email }, secret, { expiresIn:'12h' })
  return res.json({ token })
})
module.exports = router
