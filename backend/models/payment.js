const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
    customer_id:{type:mongoose.Schema.Types.ObjectId,ref:'customer'},
    staff_id:{type:mongoose.Schema.Types.ObjectId,ref:'staff'},
    rental_id:{type:mongoose.Schema.Types.ObjectId,ref:'rental'},
    amount:Number,
    payment_date:Date
});

module.exports=mongoose.model('payment',paymentSchema,'payments');