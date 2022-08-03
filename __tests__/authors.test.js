const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('get /authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(6);
    const daphne = res.body.find((author) => author.id === '1');
    expect(daphne).toHaveProperty('name', 'Daphne du Maurier');
  });

  it('get /:id should return an author with books', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Daphne du Maurier',
      dob: 'May 13, 1907',
      pob: 'London, England',
      books: [
        { id: 1, title: 'Rebecca', year: 1938 },
      ],
    });
  });

  afterAll(() => {
    pool.end();
  });
});
