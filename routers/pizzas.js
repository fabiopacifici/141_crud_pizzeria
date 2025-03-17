const express = require('express')
const router = express.Router();
const PizzaController = require('../controllers/pizzaController')

/* ✅ index (Read) */
router.get('/', PizzaController.index)

/* ✅ show (Read) */
router.get('/:id', PizzaController.show)

/* store */
router.post('/', PizzaController.store)

/* update (Update) */
router.put('/:id', PizzaController.update)

/*modify (Update)*/
router.patch('/:id', PizzaController.modify)


// ✅ destroy (Delete)
router.delete('/:id', PizzaController.destroy)

module.exports = router;
