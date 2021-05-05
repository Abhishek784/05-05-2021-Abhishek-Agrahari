var  BmiCalculatorSchema  =require('../schema/bmiSchema')


class BmiCalculatorBusiness {


  // ===================================== create a new country ========================
   
  static create(data) {
    var newBmiCalculator = new BmiCalculatorSchema(data);
    return newBmiCalculator.save().then((country) => {
      
    return country
    });
  }

   //====================================== update country ==============================
  static update(country) {
    return country.save().then((updated) => {
     return updated
    });
  }

  

  //========================================= find list of countrys=======================
   
  static find(params) {
    //console.log('find hitted');
   
    
    let ObjectId = require('mongoose').Types.ObjectId;
    let condition = {};
    let limit = 10;
    let page=0;
    let skip=0;
    let sort = 'createdAt';
    let order = -1;
    if(params._id !== undefined){
      //console.log('params._id hitted',params._id);

      condition = {
      _id: {$eq: new ObjectId(params._id)}
      }
    }
    
    if(typeof params.sort != 'undefined'){
        sort = params.sort;
    }
    if(typeof params.order != 'undefined'){
      order = params.order;
    }
    if(params.status=='active'){
        condition.status = params.status;
    }
    if(typeof params.keyword != 'undefined' && params.sort != null){
      var regex = new RegExp(params.keyword, "i")
      condition = {'$or':[{name : regex},{email : regex}]};
    }
    if(params.page){
      page =   params.page -1;
      skip =   page*limit;
    }

    if(params.limit){
      
      limit =   params.limit;
    }
    
    
    //console.log("params.limit=",params.limit)
    let aggregate=BmiCalculatorSchema.aggregate([
      {
        $match:condition
      },
      {
        $group:{
          _id:"$_id",
          gender:{
            "$first":"$gender"
          },
          status:{
            "$first":"$status"
          },
          heightCm:{
            "$first":"$heightCm"
          },
          weightKg:{
            "$first":"$weightKg"
          },
          bmi:{
            "$first":"$bmi"
          },
          bmiCategory:{
            "$first":"$bmiCategory"
          },
          healthRisk:{
            "$first":"$healthRisk"
          },
          updatedAt:{
            "$first":"$updatedAt"
          },

        }
      },
      {
        $project:{
          _id:1,
          gender:1,
          heightCm:1,
          weightKg:1,
          bmi:1,
          bmiCategory:1,
          healthRisk:1,
          status:1,
          updatedAt:1
        }
      },
      {
        $sort:{updatedAt:-1}
      },
      { 
        '$facet'    : {
        metadata: [ { $count: "total" }, { $addFields: { page:  page+1,limit:limit } } ],
        data: [ { $skip: parseInt(skip) }, { $limit: parseInt(limit) } ] // add projection here wish you re-shape the docs
         } 
    }
    ]).exec();

    return aggregate;

  }

  //================================= find single record by params =================================
  
  static findOne(params) {    
    return BmiCalculatorSchema.findOne(params).exec();
  }
  
   







  //===================================== delete account & fire delete event ================
  static delete(id) {
    return BmiCalculatorSchema.findByIdAndRemove(id).exec()
    .then((data) => {

      return data;
    });
  }

}

module.exports = BmiCalculatorBusiness;
