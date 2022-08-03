const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor({ id, name, dob, pob }) {
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.pob = pob;
  }
  
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT id, name from authors'
    );
    return rows.map((row) => new Author(row));
  }
}

module.exports = { Author };
