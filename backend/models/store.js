const mongoose=require('mongoose');

const storeSchema=new mongoose.Schema({
    name:String,
    address_id:{type:mongoose.Schema.Types.ObjectId,ref:'address'}
});

module.exports=mongoose.model('store',storeSchema,'stores');