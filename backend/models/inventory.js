const mongoose=require('mongoose');

const inventorySchema=new mongoose.Schema({
    film_id:{type:mongoose.Schema.Types.ObjectId,ref:'film'},
    store_id:{type:mongoose.Schema.Types.ObjectId,ref:'store'}
});

module.exports=mongoose.model('inventory',inventorySchema,'inventories');