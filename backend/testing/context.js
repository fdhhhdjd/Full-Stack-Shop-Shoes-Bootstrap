const testContext = {
    log: jest.fn()
  };
  
  testContext.log.error = jest.fn();
  
  module.exports = testContext;