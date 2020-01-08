const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port  = process.env.PORT || 3000;

app.use(cors())
app.use(bp.json())

const uri = process.env.DB_HOST

mongoose.connect( uri, {
  useNewUrlParser: true,
  useCreateIndex: true
})
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB connection successfully created!`)
  
})

const sheetRouter = require('./routes/sheetRouter')

app.use('/sheet', sheetRouter)

app.listen(port , () => {
  console.log(`Server running on: http://localhost:${port}`)
})