const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/api');

describe('GET /api/v1', () => {
  const isValidErrorMessage = (res) => res.body.message === '🔍 - Not Found - /api/v1/';

  it('responds with a 404', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect(isValidErrorMessage)
      .end(done);
  });
});

describe('GET missing api endpoint', () => {
  let nodeEnv;
  beforeEach(() => {
    nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = nodeEnv;
  });

  it('responds with a json message', (done) => {
    const isValidErrorMessage = (res) => res.body.message === '🔍 - Not Found - /api/v1/nope';

    request(app)
      .get('/api/v1/nope')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect(isValidErrorMessage)
      .end(done);
  });
});
