const expect = require('mocha').expect;
const app = require('../server.js');
const request = require('supertest');

describe('test GET methods', () => {
  it('should return all books', () => {
    request(app)
      .get('http://localhost:3000/books')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).length.to.equal(5);
      });
  });
});

describe('test POST methods', () => {
  it('should create a book', () => {
    request(app)
      .post('http://localhost:3000/books')
      .send({
        name: 'Ali Baba and the 40 Thieves'
      })
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('array');
        expect(res.body).length.to.equal(6);
      });
  });
});
