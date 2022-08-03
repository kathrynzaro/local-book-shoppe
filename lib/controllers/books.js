const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .get('/', async (req, res) => {
    const books = await Book.getAll(req.params);
    res.json(books);
  })
  .get('/:id', async (req, res) => {
    const data = await Book.getById(req.params.id);
    res.json(data);
  });
