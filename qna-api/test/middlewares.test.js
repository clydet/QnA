const { expect } = require('chai');
const middle = require('../src/middlewares');

describe('Internal server error', () => {
  it('responds with a 500', () => {
    let testStatus;
    const statusAssignment = (status) => testStatus = status;
    const response = { statusCode: 200, status: statusAssignment, json: () => {} };
    middle.errorHandler({ stack: 'stack' }, {}, response, null);

    expect(testStatus).to.equal(500);
  });
});
