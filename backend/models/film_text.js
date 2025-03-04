const mongoose=require('mongoose');

const filmTextSchema=new mongoose.Schema({
    film_id:{type:mongoose.Schema.Types.ObjectId,ref:'film'},
    name:String,
    description:String
});

module.exports=mongoose.model('film_text',filmTextSchema,'films_texts');

