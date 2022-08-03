const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('get /books should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(8);
    const rebecca = res.body.find((book) => book.id === '1');
    expect(rebecca).toHaveProperty('title', 'Rebecca');
    expect(rebecca).toHaveProperty('year', 1938);
  });
  
  it('get /:id should return a book with authors', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      id: '1',
      title: 'Rebecca',
      year: 1938,
      authors: [
        { id: 1, name: 'Daphne du Maurier', dob: 'May 13, 1907', pob: 'London, England' },
      ],
    });
  });

  afterAll(() => {
    pool.end();
  });
});
