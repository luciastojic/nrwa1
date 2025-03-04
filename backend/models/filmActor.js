const mongoose=require('mongoose');

const filmActorSchema=new mongoose.Schema({
    actor_id:{type:mongoose.Schema.Types.ObjectId,ref:'actor'},
    film_id:{type:mongoose.Schema.Types.ObjectId,ref:'film'}
});

module.exports=mongoose.model('filmActor',filmActorSchema,'films_actors');