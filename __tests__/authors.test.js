const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(6);
    const daphne = res.body.find((author) => author.id === '1');
    expect(daphne).toHaveProperty('name', 'Daphne du Maurier');
  });

  it('#GET /:id should return an author with books', async () => {
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

  it('#POST /authors should create a new author', async () => {
    const res = await request(app).post('/authors').send({ name: 'Shel Silverstein', dob: 'September 25, 1930', pob: 'Chicago, Illinois, United States' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Shel Silverstein');
    expect(res.body.dob).toBe('September 25, 1930');
    expect(res.body.pob).toBe('Chicago, Illinois, United States');
  });

  afterAll(() => {
    pool.end();
  });
});
