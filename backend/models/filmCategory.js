const mongoose=require('mongoose');

const filmCategorySchema=new mongoose.Schema({
    film_id:{type:mongoose.Schema.Types.ObjectId,ref:'film'},
    category_id:{type:mongoose.Schema.Types.ObjectId,ref:'category'}
});

module.exports=mongoose.model('filmCategory',filmCategorySchema,'films_categories');