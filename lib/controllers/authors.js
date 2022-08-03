const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const authors = await Author.getAll(req.params);
    res.json(authors);
  })
  .get('/:id', async (req, res) => {
    const data = await Author.getById(req.params.id);
    res.json(data);
  });
