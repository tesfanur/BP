// Load Module Dependencies

var chai 	= require('chai');
var request = require('supertest');

var app = require('../app');
var talentFix = require('./fixtures/talent');

var expect = chai.expect;

var talentId = null;
var authToken = '';

describe('Talent Signup', function() {

  describe('POST /users/signup', function() {
      it('should signup a new talent', function (done) {
        request(app)
          .post('/users/signup')
          .send(talentFix)
          .set('Content-Type', 'application/json')
          .end(function (err, res){
            if(err){
              return done(err);
            }

            if(res.status !== 201) {
              var _err = JSON.parse(res.text);
              return done(new Error(_err.message));
            }

            var talent = res.body;

            expect(talent._id).to.be.a('string');
            expect(talent.role).to.equal('talent');
            expect(talent.username).to.equal(talentFix.email);

            talentId = talent._id;

            done();
          });
      });
  });

});

// Login Talent
describe('Talent Login', function() {
  var loginInfo = {
    username: talentFix.email,
    password: talentFix.password
  };

  describe('POST /users/login', function() {
      it('should login a talent', function (done) {
        request(app)
          .post('/users/login')
          .send(loginInfo)
          .set('Content-Type', 'application/json')
          .end(function (err, res){
            if(err){
              return done(err);
            }

            if(res.status !== 200) {
              var _err = JSON.parse(res.text);
              return done(new Error(_err.message));
            }

            var data = res.body;

            expect(data.token).to.be.a('string');
            expect(data.user).to.be.a('object');
            expect(data.user).to.have.a.property('_id');
            expect(data.user.user).to.be.a('object');
            expect(data.user.user).to.have.a.property('role', 'talent');

            authToken = data.token;
            talentId = data.user.user._id;

            done();
          });
      });
  });

});


// Remove Talent
describe('Remove Talent', function () {
  describe('DELETE /users/:id', function () {
    it('should delete a created talent', function (done){
      request(app)
        .delete('/users/' + talentId)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + authToken)
        .end(function (err, res){
            if(err){
              return done(err);
            }

            if(res.status !== 200) {
              var _err = JSON.parse(res.text);
              return done(new Error(_err.message));
            }

            var user = res.body;

            expect(user._id).to.be.a('string');
            expect(user.role).to.equal('talent');
            expect(user.username).to.equal(talentFix.email);

            done();
          });
    });
  });
});