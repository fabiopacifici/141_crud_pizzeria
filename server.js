const express = require('express')
const cors = require("cors");
const app = express()
const port = 3001;
const pizzasRouter = require('./routers/pizzas')
const usersRouter = require('./routers/users')
const logger = require('./middlewares/logger')
const serverError = require('./middlewares/serverError')
const error_404 = require('./middlewares/error_404')


// Middeleware
app.use(express.static('public'))
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5176'
}));

// Global Middelware
// Anonimous function
/* app.use((req, res, next) => {
  const date = new Date();
  console.log(date.toISOString() + ' - ' + req.method + ' - ' + req.url);
  next();
}); */
// Named function
//app.use(logger);


/* Route level Middleware 
app.get('/', (req, res, next) => {
  const date = new Date();
  console.log(date.toISOString() + ' - ' + req.method + ' - ' + req.url);
  next();
}, (req, res) => {
  res.send('Welcome To our Server')

})
*/

/* app.get('/', logger, (req, res) => {
  res.send('Welcome To our Server')

}) */

app.get('/', (req, res) => {

  // 👉 Trigger the error by calling a method that does not exists
  //app.daje();
  // or use the throw keyword
  //throw new Error('Server Error')

  res.send('Welcome To our Server')

})

// Path Middleware  
/* app.use('/api/v1', (req, res, next) => {

  const date = new Date();
  console.log(date.toISOString() + ' - ' + req.method + ' - ' + req.url);
  next();
}); */
//app.use('/api/v1', logger);

/* 🍕 Pizzas Endpoints */
app.use('/api/v1/pizzas', pizzasRouter)

/* 🫤 Users */
app.use('/api/v1/users', usersRouter)




// Server errors middleware
/* app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: '500 Internal Server Error',
    message: err.message
  });
}); */
app.use(serverError)


// 404 Error
app.use(error_404);


// Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);

})