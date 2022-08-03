const pool = require('../utils/pool');
// const { Author } = require('./Author');

class Book {
  id;
  title;
  year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.year = row.year;
    this.authors = row.authors ?? [];
  }
  
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT books.* from books'
    );
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.*, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors.id IS NOT NULL)
    ) as authors from books
      LEFT JOIN authors_books on books.id = authors_books.book_id 
      LEFT JOIN authors on authors_books.author_id = authors.id
      WHERE books.id = $1
      GROUP BY books.id`, [id]
    );
    return new Book(rows[0]);
  }

  static async insert({ title, year }) {
    const { rows } = await pool.query(
      `INSERT INTO books (title, year)
      VALUES ($1, $2)
      RETURNING *`,
      [title, year]
    );
    return new Book(rows[0]);
  }
}

module.exports = { Book };
