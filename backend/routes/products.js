const express = require('express')
const router = express.Router()
const { Product } = require('../models')
router.get('/',async(req,res)=>{
  const products = await Product.findAll()
  res.json(products)
})
router.post('/',async(req,res)=>{
  const { name, price, description } = req.body
  const p = await Product.create({ name, price, description })
  res.json(p)
})
router.get('/:id',async(req,res)=>{
  const p = await Product.findByPk(req.params.id)
  if(!p) return res.status(404).json({error:'not found'})
  res.json(p)
})
router.put('/:id',async(req,res)=>{
  const p = await Product.findByPk(req.params.id)
  if(!p) return res.status(404).json({error:'not found'})
  await p.update(req.body)
  res.json(p)
})
router.delete('/:id',async(req,res)=>{
  const p = await Product.findByPk(req.params.id)
  if(!p) return res.status(404).json({error:'not found'})
  await p.destroy()
  res.json({ok:true})
})
module.exports = router
