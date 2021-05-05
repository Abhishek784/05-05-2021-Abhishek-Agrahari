const request = require('supertest')
const mongoose = require('mongoose')
const expect = require('chai').expect
const { app } = require('../index')
const {BmiCalculatorSchema} = require('../schema/bmiSchema')
var before = require('mocha').before;
const { setupDatabase , bmiOne} = require('./utils/bmi')


const bmiId = new mongoose.Types.ObjectId()

before(setupDatabase);


  // /*
  //  * START
  //  * Test Case For Register a User
  //  */

      describe('POST /api/bmi/add', function() {
          it('Should register a new bmi', function(done) {
            request(app)
              .post('/api/bmi/add')
              .send({
                "gender":"TestUser",
                "heightCm":175,
                "weightKg":75,
              })
              .expect(200)
              .expect(200)
              .end(function(err, res) {
                if (err) return done(err);
                return done();
              });
          });
          
        });

  // /*
  //  * END
  //  * Test Case For Register a User
  //  */


  /*
   * START
   * Test Case For Find All User
   */

      describe('GET /api/v1/bmi', function() {
        it('Should get all bmi', function(done) {
          request(app)
            .get('/api/bmi')
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err);
              
              return done();
            });
        });
      });  

  /*
   * END
   * Test Case For Find All User
   */

