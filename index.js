var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var path = require('path');


var app=express();



//==============Add middleware necessary for REST API's===============

app.use(bodyparser.urlencoded(
    {
        limit: '50mb',
        parameterLimit: 100000, 
        extended: true 
    }));
app.use(bodyparser.json());


//======================= load the routes ============================

var apiRoutes = require('./routes/apiRoutes.js');
app.use('/api', apiRoutes);

// app.use('/api', (req,res)=>{
//     res.send("hii");
// });



//===========================Connect to MongoDB==========================

const PORT=process.env.PORT || 5000;

var CONNECTION_URL = "mongodb://" + "localhost" + ":" + 27017 + "/" + "bmiCalculator"

mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((err)=>{console.log(err)});

mongoose.set('useFindAndModify', false);

module.exports= {app};