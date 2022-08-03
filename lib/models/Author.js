const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books ?? [];
  }
  
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT id, name from authors'
    );
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      authors.*, 
      COALESCE(
        json_agg(to_jsonb(books))
        FILTER (WHERE books.id IS NOT NULL)
    ) as books from authors
      LEFT JOIN authors_books on authors.id = authors_books.author_id 
      LEFT JOIN books on authors_books.book_id = books.id
      WHERE authors.id = $1
      GROUP BY authors.id`, [id]
    );
    return new Author(rows[0]);
  }
}

module.exports = { Author };
