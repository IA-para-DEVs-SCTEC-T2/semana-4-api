const express = require('express');
const itemsRouter = require('./routes/items');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Routes
app.use('/items', itemsRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
