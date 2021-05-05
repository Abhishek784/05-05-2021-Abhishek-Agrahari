let mongoose=require('mongoose');


let Schema = mongoose.Schema;

let BmiCalculatorSchema=new Schema({

    gender       :     { type: String },
    heightCm     :     { type: Number },
    weightKg     :     { type: Number },
    bmi          :     { type: Number },
    bmiCategory  :     { type: String },
    healthRisk   :     { type: String },
    status       :     { type:Boolean , default:true },
    
    
},{
    timestamps: true
});


module.exports = mongoose.model('bmiCalculator', BmiCalculatorSchema);