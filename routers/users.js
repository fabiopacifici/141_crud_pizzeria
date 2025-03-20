const express = require('express')
const router = express.Router()
const logger = require('../middlewares/logger')


router.use(logger)
// index (Read)
router.get('/', (req, res) => {
  res.send('Return all users here')
})

// show (Read)
router.get('/:id', (req, res) => {

  //console.log(req);

  const userId = req.params.id
  res.send(`Return user with id: ${userId}`)
})

// C(Create) 
// store
router.post('/', (req, res) => {
  res.send('Store a new user')
})


// update (Update)
router.put('/:id', (req, res) => {
  res.send(`Update the user with an id of ${req.params.id}`)
})

// modify (Update) 
router.patch('/:id', (req, res) => {
  res.send(`Modify the user with an id of ${req.params.id}`)
})


//delete (Delete)
router.delete('/:id', (req, res) => {
  res.send('Delete the user with id' + req.params.id)
})

module.exports = router