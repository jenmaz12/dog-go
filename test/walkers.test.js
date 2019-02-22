const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe('GET /api/walkers', () => {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(() => {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should find all walkers', (done) => {
    // Add some examples to the db to test with
    db.Walker.bulkCreate([
      { name: 'John Doe', email: '123@test.com', phoneNumber: '2276159835' },
      { name: 'Jane Doe', email: '456@test.com', phoneNumber: '6732890012' },
    ]).then(() => {
      // Request the route that returns all examples
      request.get('/api/walkers').end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('array')
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an('object')
          .that.includes({ name: 'John Doe', email: '123@test.com', phoneNumber: '2276159835' });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({ name: 'Jane Doe', email: '456@test.com', phoneNumber: '6732890012' });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
