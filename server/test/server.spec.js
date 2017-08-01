'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const server = require('../index.js');


describe('Express Server', function() {
  var dbConnection;

  // beforeEach(function(done) {
  //   dbConnection = 
  // });

// describe('GET /api/search', function() {
//   it('respond with object', function(done) {
//     request(app)
//       .get('/api/search')
//       .expect(200)
//       .expect(function(res) {
//         expect(res.text).to.equal('Hello World!');
//       })
//       .end(done);
//   });

//   it('accepts POST request', function(done) {
//     request(app)
//       .post('/api')
//       .expect(201)
//       .expect(function(res) {
//         expect(res.body.data).to.equal('Posted!');
//       })
//       .end(done);
//   });
// });
