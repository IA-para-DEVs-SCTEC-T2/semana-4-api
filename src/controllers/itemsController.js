const { v4: uuidv4 } = require('uuid');
const items = require('../data/items');
const { validateItem } = require('../validators/itemValidator');

function getItems(req, res) {
  return res.status(200).json({
    success: true,
    count: items.length,
    data: items,
  });
}

function createItem(req, res) {
  const errors = validateItem(req.body);

  if (errors.length > 0) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed.',
      errors,
    });
  }

  const { name, description, price, category, inStock = true } = req.body;

  const newItem = {
    id: uuidv4(),
    name: name.trim(),
    description: description.trim(),
    price,
    category,
    inStock,
    createdAt: new Date().toISOString(),
  };

  items.push(newItem);

  return res.status(201).json({
    success: true,
    message: 'Item created successfully.',
    data: newItem,
  });
}

function deleteItem(req, res) {
  const { id } = req.params;

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Item with id "${id}" not found.`,
    });
  }

  const [removed] = items.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: 'Item deleted successfully.',
    data: removed,
  });
}

module.exports = { getItems, createItem, deleteItem };
