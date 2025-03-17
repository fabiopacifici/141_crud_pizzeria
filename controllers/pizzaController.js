const menu = require('../data/menu')

function index(req, res) {

  // make a copy of the menu
  let filteredMenu = menu
  // TODO: Filter the results
  console.log(req);

  if (req.query.ingredient) {
    console.log('filter the results');
    filteredMenu = menu.filter(pizza => pizza.ingredients.includes(req.query.ingredient))

  }
  //res.send('Return all pizzas here')
  res.json(filteredMenu)
}

function show(req, res) {

  //console.log(req);

  const pizzaId = Number(req.params.id)

  // find the pizza with the given id
  const pizza = menu.find(pizza => pizza.id === pizzaId)
  console.log(pizza);

  // handle 404 error
  if (!pizza) {

    // set the status code accordingly
    //res.status(404)

    return res.status(404).json({
      error: '404 Not Found',
      message: 'Pizza not found'
    })
  }

  // return the given pizza

  res.json(pizza)
  //res.send(`Return pizza with id: ${pizzaId}`)
}

/* TODO */
function store(req, res) {

  res.send('Store a new pizza')
}

function update(req, res) {
  res.send(`Update the pizza with an id of ${req.params.id}`)
}

function modify(req, res) {
  res.send(`Modify the pizza with an id of ${req.params.id}`)
}

// if you want you an use arrow functions with fucntion expressions

const destroy = (req, res) => {



  // get the id of the given pizza
  const pizzaId = Number(req.params.id)

  // find the pizza with the given ID in the menu
  const pizza = menu.find(pizza => pizza.id === pizzaId)
  console.log(pizza);
  // if not found return a 404
  if (!pizza) {

    // set the status code accordingly
    //res.status(404)

    return res.status(404).json({
      error: '404 Not Found',
      message: 'Pizza not found'
    })
  }

  // remove the give object from the menu array (use splice)



  menu.splice(menu.indexOf(pizza), 1)

  console.log(menu);

  res.sendStatus(204)


}

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy
}