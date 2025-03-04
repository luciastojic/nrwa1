const mongoose=require('mongoose');

const customerSchema=new mongoose.Schema({
    store_id:{type:mongoose.Schema.Types.ObjectId,ref:'store'},
    first_name:String,
    last_name:String,
    email:String,
    address_id:{type:mongoose.Schema.Types.ObjectId,ref:'address'}
});

module.exports=mongoose.model('customer',customerSchema,'customers');