const mongoose=require('mongoose');

const rentalSchema=new mongoose.Schema({
    rental_date:Date,
    inventory_id:{type:mongoose.Schema.Types.ObjectId,ref:'inventory'},
    customer_id:{type:mongoose.Schema.Types.ObjectId,ref:'customer'},
    return_date:Date,
    staff_id:{type:mongoose.Schema.Types.ObjectId,ref:'staff'}
});

module.exports=mongoose.model('rental',rentalSchema,'rentals');