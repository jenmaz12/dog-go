// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

// eslint-disable-next-line no-undef
describe('canary test', () => {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  // eslint-disable-next-line no-undef
  it('should pass this canary test', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(true).to.be.true;
  });
});
