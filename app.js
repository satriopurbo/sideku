const express = require('express')
const morgan = require('morgan')
const routing = require('./routing/index')
<<<<<<< HEAD
const cors = require('cors')
=======
const errorHandler = require('./Middleware/errorHandler')
>>>>>>> e83c4782ca6ff0b55f92c19942e503a3fbe23dec
const app = express()
const cors=require('cors')

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routing)
app.use(errorHandler)

const port = 8801
app.listen(port, () => {
  console.log(`telah tersambung pada port : ${port}`)
})
