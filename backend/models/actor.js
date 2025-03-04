const mongoose=require('mongoose');

const actorSchema=new mongoose.Schema({
    first_name:String,
    last_name:String
});

module.exports=mongoose.model('actor',actorSchema,'actors');