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

  afterAll(() => {
    pool.end();
  });
});
