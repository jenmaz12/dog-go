const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);
let request;

// eslint-disable-next-line no-undef
describe('GET /api/customers', () => {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  // eslint-disable-next-line no-undef
  it('should find all customers', (done) => {
    // Add some examples to the db to test with
    db.Customer.bulkCreate([
      { name: 'John Doe', petName: 'Vale', email: '123@test.com', phoneNumber: '2276159835' },
      { name: 'Jane Doe', petName: 'Vale', email: '456@test.com', phoneNumber: '6732890012' },
    ]).then(() => {
      // Request the route that returns all examples
      request.get('/api/customers').end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response

        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('array')
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an('object')
          .that.includes({ name: 'John Doe', petName: 'Vale', email: '123@test.com', phoneNumber: '2276159835' });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({ name: 'Jane Doe', petName: 'Vale', email: '456@test.com', phoneNumber: '6732890012' });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
