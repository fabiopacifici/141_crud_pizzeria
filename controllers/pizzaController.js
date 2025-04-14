const connection = require('../data/db')
const menu = require('../data/menu')



function index(req, res) {

  const sql = 'SELECT * FROM pizzas'
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Query Failed' })

    console.log(results);
    res.json(results)

  });


  /*   // make a copy of the menu
    let filteredMenu = menu
    // TODO: Filter the results
  
  
    if (req.query.ingredient) {
      console.log('filter the results');
      filteredMenu = menu.filter(pizza => pizza.ingredients.includes(req.query.ingredient))
  
    }
    //res.send('Return all pizzas here')
    res.json(filteredMenu) */


}

function show(req, res) {

  //console.log(req);

  const pizzaId = Number(req.params.id)

  const sql = 'SELECT * FROM pizzas WHERE id = ?'

  const sqlJoin = `
  SELECT ingredients.*
  FROM pizza_ingredients
  JOIN ingredients ON pizza_ingredients.ingredient_id = ingredients.id
  WHERE pizza_ingredients.pizza_id = ?
`


  connection.query(sql, [pizzaId], (err, pizzaResults) => {

    if (err) return res.status(500).json({ message: 'Query Failed' })
    if (pizzaResults.length === 0) return res.status(404).json({ message: 'Pizza not found' })

    // Get the pizza from the results
    const pizza = pizzaResults[0]
    //console.log(pizza);


    /* TODO: get the data from the retationship */
    connection.query(sqlJoin, [pizzaId], (err, ingredientsResults) => {
      if (err) return res.status(500).json({ message: 'Query Failed' })

      console.log(ingredientsResults); // [{}]
      pizza.ingredients = ingredientsResults


      // return the response
      res.json(pizza)

    })


  })





  /* 
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
      }) */


  // return the given pizza


  //res.send(`Return pizza with id: ${pizzaId}`)
}


function store(req, res) {

  // Creiamo un nuovo id incrementando l'ultimo id presente
  const newId = menu[menu.length - 1].id + 1;


  const { ingredients } = req.body
  console.log(typeof ingredients);


  // Creiamo un nuovo oggetto pizza
  const newPizza = {
    id: newId,
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    ingredients: req.body.ingredients
  }

  // Aggiungiamo la nuova pizza al menu
  menu.push(newPizza);

  // controlliamo
  console.log(menu);


  // Restituiamo lo status corretto e la pizza appena creata
  res.status(201);
  res.json(newPizza);

}

/* TODO */
function update(req, res) {

  // get the pizza id
  const pizzaId = Number(req.params.id)

  // find the pizza by id
  const pizza = menu.find(pizza => pizza.id === pizzaId)
  console.log(pizza);

  // check if the pizza is in our list or return a 404
  if (!pizza) {

    // set the status code accordingly
    //res.status(404)

    return res.status(404).json({
      error: '404 Not Found',
      message: 'Pizza not found'
    })
  }

  // update the resource
  console.log(req.body);

  pizza.name = req.body.name;
  pizza.price = req.body.price;
  pizza.ingredients = req.body.ingredients;
  pizza.img = req.body.img;


  // check if the menu was updated
  console.log(menu);

  //res.send(`Update the pizza with an id of ${req.params.id}`)

  res.json(pizza);



}


function modify(req, res) {
  res.send(`Modify the pizza with an id of ${req.params.id}`)
}

// if you want you an use arrow functions with fucntion expressions

function destroy(req, res) {



  // get the id of the given pizza
  const pizzaId = Number(req.params.id)

  const sql = 'DELETE FROM pizzas WHERE id = ?'

  connection.query(sql, [pizzaId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Query Failed' })
    if (results.affectedRows === 0) return res.status(404).json({ message: 'There is nothing to delete' })
    //console.log(results);

    res.sendStatus(204)
  })


}

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy
}