const { Router } = require('express');
const { getItems, createItem, deleteItem } = require('../controllers/itemsController');

const router = Router();

router.get('/', getItems);
router.post('/', createItem);
router.delete('/:id', deleteItem);

module.exports = router;
