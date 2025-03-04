const mongoose=require('mongoose');

const filmSchema=new mongoose.Schema({
    title:String,
    description:String,
    release_year:Number,
    language:{type:mongoose.Schema.Types.ObjectId,ref:'language'},
    original_language:{type:mongoose.Schema.Types.ObjectId,ref:'language'},
    rental_duration:Number,
    rental_rate:Number,
    length:Number,
    replacment_cost:Number,
    rating:Number,
    special_features:String
});

module.exports=mongoose.model('film',filmSchema,'films');