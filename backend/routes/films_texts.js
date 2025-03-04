const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const FilmText=require('../models/film_text');

router.get('/',async(req,res)=>{
    try{
        const films_texts=await FilmText.find();
        res.json(films_texts);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const film_text=await FilmText.findById(req.params.id);
        if(film_text){
            res.json(film_text);
        }else{
            return res.status(404).json({message:'Tekst filma nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.post('/',async(req,res)=>{
    const film_text=new FilmText(req.body);
    try{
        const newFilmText=await film_text.save();
        res.status(201).json(newFilmText);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.put('/:id',async(req,res)=>{
    try{
        const film_text=await FilmText.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(film_text){
            res.json(film_text);
        }else{
            return res.status(404).json({message:'Tekst filma nije pronađen'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const film_text=await FilmText.findByIdAndDelete(req.params.id);
        if(film_text){
            res.status({message:'Tekst filma je izbrisan'});
        }else{
            return res.status(404).json({message:'Tekst filma nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;