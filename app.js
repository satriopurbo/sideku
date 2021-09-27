const express = require('express')
const morgan = require('morgan')
const routing = require('./routing/index')
const errorHandler = require('./Middleware/errorHandler')
const app = express()
const cors=require('cors')

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');


app.use('/', routing)
app.use(errorHandler)

const port = 8801
app.listen(port, () => {
  console.log(`telah tersambung pada port : ${port}`)
})
