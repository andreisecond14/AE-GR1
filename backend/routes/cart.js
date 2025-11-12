const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { CartItem, Product } = require('../models')
router.use(auth)
router.get('/',async(req,res)=>{
  const items = await CartItem.findAll({ where:{ userId:req.user.id }, include:Product })
  res.json(items)
})
router.post('/add',async(req,res)=>{
  const { productId, quantity } = req.body
  const q = quantity && quantity>0?quantity:1
  const existing = await CartItem.findOne({ where:{ userId:req.user.id, productId } })
  if(existing){
    existing.quantity += q
    await existing.save()
    return res.json(existing)
  }
  const item = await CartItem.create({ userId:req.user.id, productId, quantity:q })
  res.json(item)
})
router.put('/:id',async(req,res)=>{
  const item = await CartItem.findByPk(req.params.id)
  if(!item || item.userId!==req.user.id) return res.status(404).json({error:'not found'})
  const q = req.body.quantity || 1
  item.quantity = q
  await item.save()
  res.json(item)
})
router.delete('/:id',async(req,res)=>{
  const item = await CartItem.findByPk(req.params.id)
  if(!item || item.userId!==req.user.id) return res.status(404).json({error:'not found'})
  await item.destroy()
  res.json({ok:true})
})
module.exports = router
