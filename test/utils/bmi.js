const mongoose = require('mongoose')
const BmiCalculatorSchema = require('../../schema/bmiSchema.js')
const {BmiCalculatorBusiness} = require('../../businesses/bmiBusiness')






const bmiOneId     = new mongoose.Types.ObjectId()

const bmiOne = {
    _id: bmiOneId,
    "gender":"TestUser",
    "heightCm":175,
    "weightKg":75,
    
}



const setupDatabase = async () => {
    
    
    

    await BmiCalculatorSchema.deleteMany()
    await BmiCalculatorSchema.create(bmiOne)
    
    
}


module.exports = {
    bmiOne,
    setupDatabase

}