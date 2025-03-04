const mongoose=require('mongoose');

const staffSchema=new mongoose.Schema({
    first_name:String,
    last_name:String,
    address_id:{type:mongoose.Schema.Types.ObjectId,ref:'address'},
    email:String,
    store_id:{type:mongoose.Schema.Types.ObjectId,ref:'store'}
});

module.exports=mongoose.model('staff',staffSchema,'staffs');