const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const FilmActor=require('../models/filmActor');

router.get('/',async(req,res)=>{
    try{
        const films_actors=await FilmActor.find();
        res.json(films_actors);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const film_actor=await FilmActor.findById(req.params.id);
        if(film_actor){
            res.json(film_actor);
        }else{
            return res.status(404).json({message:'Glumac nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.post('/',async(req,res)=>{
    const film_actor=new FilmActor(req.body);
    try{
        if(film_actor){
            const newFilmActor=await film_actor.save();
            res.status(201).json(newFilmActor);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

module.exports=router;