'use strict';

var BmiCalculatorBusiness  = require('../businesses/bmiBusiness.js')
var BmiCalculatorValidator  = require('../validators/bmiValidator.js')

function validationError(res, statusCode, message, data) {
  statusCode = statusCode || 422;
  return res.status(statusCode)
  .send(
    {
      statuscode:statusCode,
      message:message,
      response:data
    });
}

function handleResponse(res, statusCode, message, data) {
  statusCode = statusCode || 500;
  return res.status(statusCode)
    .send(
      {
        statuscode:statusCode,
        message:message,
        response:data
      });
}


class BmiCalculatorController {
  
//=============================== Get list of bmi =================================
   
  static index(req, res) {
    if(req.query.limit!='undefined'){
			req.query.limit = parseInt(req.query.limit);
		}
		if(req.query.offset!='undefined'){
			req.query.offset = parseInt(req.query.offset);
    }
    //console.log('index hitted',req.query);
    
    return BmiCalculatorBusiness.find(req.query)
    .then((data) => {
      //console.log('data',data)
      handleResponse(res, 200, 'BmiCalculator List', data)
    })
    .catch((err) => {
      handleResponse(res, 500, err.message, err)
    });
}

  /**
   *========================================= Creates a new bmi ========================================
   */
  static create(req, res, next) {

    BmiCalculatorValidator.validateCreating(req.body).then(bmi => {
        bmi.gender = req.body.gender;
        bmi.heightCm = req.body.heightCm;
        bmi.weightKg = req.body.weightKg;
        bmi.status = ( 
                        (req.body.status === true || req.body.status == 'true') || 
                        (req.body.status === false || req.body.status == 'false') 
                      ) ? req.body.status:true
        bmi.bmi= ((bmi.weightKg*100*100)/(bmi.heightCm*bmi.heightCm)).toFixed(2);  
        if(bmi.bmi<=18.4)
        {
            bmi.bmiCategory="Underweight"
            bmi.healthRisk ="Malnutrition risk"
        }
        if(bmi.bmi>=18.5 && bmi.bmi<= 24.9)
        {
            bmi.bmiCategory="Normal weight"
            bmi.healthRisk ="Low risk"
        }
        if(bmi.bmi>=25 && bmi.bmi<=29.9)
        {
            bmi.bmiCategory="Overweight"
            bmi.healthRisk ="Enhanced risk"
        }
        if(bmi.bmi>=30 && bmi.bmi<=34.9)
        {
            bmi.bmiCategory="Moderately obese"
            bmi.healthRisk ="Medium risk"
        }
        if(bmi.bmi>=35 && bmi.bmi<=39.9)
        {
            bmi.bmiCategory="Severely obese"
            bmi.healthRisk ="High risk "
        }
        if(bmi.bmi>=40)
        {
            bmi.bmiCategory="Very severely obese"
            bmi.healthRisk ="Very high risk"
        }
        BmiCalculatorBusiness.create(bmi)
        .then((data) => {
          //console.log('data',data)
          handleResponse(res, 200, 'BmiCalculator Added Successfully', data)
        })
        .catch((err) => {
          handleResponse(res, 500, err.message, err)
        });
    })
    .catch(err => validationError(res, 422, err.cause.details[0].message, err));


}


   /**
   *================================================ Update Profile BmiCalculator ============================================
   */
  static update(req, res, next) {
    //TODO - update validator
    BmiCalculatorValidator.validateUpdating({...req.body, ...req.params})
    .then(bmi => {
      //console.log('req.files--->', req.files)
      var bmiId = req.params.id;
      BmiCalculatorBusiness.findOne({_id: bmiId})
        .then(bmi => {
          if (!bmi) { 
            handleResponse(res, 500, 'BmiCalculator Not Exist', {}) 
          }
          bmi.gender = req.body.gender?req.body.gender:bmi.gender;
          bmi.heightCm = req.body.heightCm?req.body.heightCm:bmi.heightCm;
          bmi.weightKg = req.body.weightKg?req.body.weightKg:bmi.weightKg;
          bmi.status = ( 
                          (req.body.status === true || req.body.status == 'true') || 
                          (req.body.status === false || req.body.status == 'false') 
                        ) ? req.body.status:bmi.status;

            BmiCalculatorBusiness.update(bmi)
            .then((data) => {
              //console.log('data',data)
              handleResponse(res, 200, 'BmiCalculator Updated Successfully', data)
            })
            .catch((err) => {
              handleResponse(res, 500, err.message, err)
            });
    })
  })
  .catch(err => validationError(res, 422, err.cause.details[0].message, err));

  }

  
  //=============================== Deletes a bmi ==================================
  
  static delete(req, res) {

    BmiCalculatorValidator.validateUpdating(req.params).then(bmi => {

        BmiCalculatorBusiness.findOne({_id: req.params.id})
        .then(bmi => {

            return BmiCalculatorBusiness.delete(req.params.id)
            .then((data) => {
              //console.log('data',data)
              handleResponse(res, 200, 'BmiCalculator deleted Successfully', data)
            })
            .catch((err) => {
              handleResponse(res, 500, err.message, err)
            });
        
            })
            .catch((err) => {   
              handleResponse(res, 500, err.message, err)
            }) 
    }) 
    .catch(err => validationError(res, 422, err.cause.details[0].message, err));

  }
}

module.exports = BmiCalculatorController;
