"use strict";

var express = require("express");
var bodyParser = require('body-parser');

var  BmiCalculatorController = require('../controller/bmiController')




var app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
console.log('app routes hitted');



//--------- BmiCalculators profile start -------   
    app.post(
    "/bmi/add",
    BmiCalculatorController.create
    ); 

    app.delete(
        "/bmi/delete",
        BmiCalculatorController.delete
    );

    app.get(
        "/bmi",  
        BmiCalculatorController.index
    );

    app.put(
        "/bmi/:id",
        BmiCalculatorController.update
    );      
     
//--------- BmiCalculators profile end -------   


module.exports=app;