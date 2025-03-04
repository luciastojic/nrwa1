const mongoose=require('mongoose');

const countrySchema=new mongoose.Schema({
    country_name:String
});

module.exports=mongoose.model('country',countrySchema,'countries');