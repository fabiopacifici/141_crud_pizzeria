const express = require('express')
const app = express()
const port = 3000;
const pizzasRouter = require('./routers/pizzas')
const usersRouter = require('./routers/users')


app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);

})


app.get('/', (req, res) => {
  res.send('Welcome To our Server')

})


/* 🍕 Pizzas Endpoints */
app.use('/api/v1/pizzas', pizzasRouter)

/* 🫤 Users */
app.use('/api/v1/users', usersRouter)




