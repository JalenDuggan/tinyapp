const assert  = require('chai').assert;

const { findUserByEmail } = require('../helpers/authenticationHelpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a object email of user', function() {
    const user = findUserByEmail("user2@example.com", testUsers)
    const expectedOutput = ('user2@example.com')
    // Write your assert statement here
    assert.equal(user.email, expectedOutput);
    assert.isObject(user)
  });
  it('should return true to varify that it is an object', () => {
    const user = findUserByEmail("user2@example.com", testUsers)
    assert.isObject(user)
  });
  it('should return the user id ', function() {
    const user = findUserByEmail("user2@example.com", testUsers)
    const expectedOutput = ('user2RandomID')
    // Write your assert statement here
    assert.equal(user.id, expectedOutput);
    assert.isObject(user)
  });
});
