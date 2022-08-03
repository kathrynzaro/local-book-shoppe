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
  }
  
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT id, name from authors'
    );
    return rows;
  }
}

module.exports = { Author };
