const request = require('supertest');
const { expect } = require('chai');
const { User } = require('../src/models/user.model');
const app = require('../src/api');

describe('GET /api/v1/users/', () => {
  beforeEach(async () => {
    await User.insertUser({ firstName: 'Bub', lastName: 'Bubson', email: 'bbub@gmail.com' });
    await User.insertUser({ firstName: 'Jim', lastName: 'Jimson', email: 'jjim@gmail.com' });
  });

  afterEach(async () => {
    await User.deleteUsers();
  });

  it('should return all users', (done) => {
    const isValidResponse = (res) => {
      const firstNames = res.body.rows.map((user) => user.firstName);
      expect(firstNames).to.have.members(['Bub', 'Jim']);
    };

    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(isValidResponse)
      .end(done);
  });
});
