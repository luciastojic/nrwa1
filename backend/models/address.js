const mongoose=require('mongoose');

const addressSchema=new mongoose.Schema({
    address:String,
    city_id:{type:mongoose.Schema.Types.ObjectId,ref:'city'},
    postal_code:Number,
    phone:String
});

module.exports=mongoose.model('address',addressSchema,'addresses');