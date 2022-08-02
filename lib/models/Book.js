const pool = require('../utils/pool');

class Book {
  id;
  title;
  year;

  constructor({ id, title, year }) {
    this.id = id;
    this.title = title;
    this.year = year;
  }
  
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT books.* from books'
    );
    return rows.map((row) => new Book(row));
  }
}

module.exports = { Book };
