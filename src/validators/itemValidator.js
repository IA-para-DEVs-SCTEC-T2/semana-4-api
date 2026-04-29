const VALID_CATEGORIES = ['electronics', 'peripherals', 'accessories', 'software', 'other'];

function validateItem(body) {
  const errors = [];

  // name
  if (!body.name) {
    errors.push('Field "name" is required.');
  } else if (typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push('Field "name" must be a string with at least 2 characters.');
  } else if (body.name.trim().length > 100) {
    errors.push('Field "name" must not exceed 100 characters.');
  }

  // description
  if (!body.description) {
    errors.push('Field "description" is required.');
  } else if (typeof body.description !== 'string' || body.description.trim().length < 5) {
    errors.push('Field "description" must be a string with at least 5 characters.');
  } else if (body.description.trim().length > 500) {
    errors.push('Field "description" must not exceed 500 characters.');
  }

  // price
  if (body.price === undefined || body.price === null) {
    errors.push('Field "price" is required.');
  } else if (typeof body.price !== 'number' || isNaN(body.price)) {
    errors.push('Field "price" must be a number.');
  } else if (body.price < 0) {
    errors.push('Field "price" must be a positive number.');
  }

  // category
  if (!body.category) {
    errors.push('Field "category" is required.');
  } else if (!VALID_CATEGORIES.includes(body.category)) {
    errors.push(`Field "category" must be one of: ${VALID_CATEGORIES.join(', ')}.`);
  }

  // inStock (optional, defaults to true)
  if (body.inStock !== undefined && typeof body.inStock !== 'boolean') {
    errors.push('Field "inStock" must be a boolean.');
  }

  return errors;
}

module.exports = { validateItem };
