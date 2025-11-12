const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const { sequelize, Product } = require('./models')
const authRoutes = require('./routes/auth')
const productsRoutes = require('./routes/products')
const cartRoutes = require('./routes/cart')
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)
const PORT = process.env.PORT || 4000
async function init(){
  await sequelize.sync()
  const count = await Product.count()
  if(count===0){
    await Product.bulkCreate([
      { name:'tricou', price:29.9, description:'tricou bumbac' },
      { name:'bluza', price:79.9, description:'bluza dama' },
      { name:'pantaloni', price:119.5, description:'pantaloni barbati' }
    ])
  }
  app.listen(PORT,()=>console.log('server started '+PORT))
}
init()
