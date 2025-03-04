const mongoose=require('mongoose');

const citySchema=new mongoose.Schema({
    city_name:String,
    country_id:{type:mongoose.Schema.Types.ObjectId,ref:'country'}
});

module.exports=mongoose.model('city',citySchema,'cities');