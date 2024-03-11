const express = require("express")
const cors = require("cors")
const app = express();
const { logger } = require('./middlewares')

app.use(logger)
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

// routers 
const rentcarRouter = require('./routes/rent_car')
const carRouter = require('./routes/crud_car')
const userRouter = require('./routes/user')
const paymentRouter = require('./routes/payment')
const myrentRouter = require('./routes/myrent')
const returnCar = require('./routes/return_car')


// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(rentcarRouter.router)
app.use(carRouter.router)
app.use(userRouter.router)
app.use(paymentRouter.router)
app.use(myrentRouter.router)
app.use(returnCar.router)
// app.use(commentRouter.router)

app.get('/', (req, res) => res.send('Hello world!'))

app.listen(3000, () => {
  console.log(`Example app listening at http://35.198.237.137:3000`)
})
