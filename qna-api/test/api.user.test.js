const request = require('supertest');
const { expect } = require('chai');
const { User } = require('../src/models/user.model');
const app = require('../src/api');

describe('GET /api/v1/users/', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should return all users', async () => {
    const users = [
      { firstName: 'Bub', lastName: 'Bubson', email: 'bbub@gmail.com' },
      { firstName: 'Jim', lastName: 'Jimson', email: 'jjim@gmail.com' }
    ];
    await User.insertMany(users);
    const response = await request(app).get('/api/v1/users/');

    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(2);
  });
});
