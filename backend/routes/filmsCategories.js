const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const FilmCategory=require('../models/filmCategory');

router.get('/',async(req,res)=>{
    try{
        const films_categories=await FilmCategory.find();
        res.json(films_categories);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const film_category=await FilmCategory.findById(req.params.id);
        if(film_category){
            res.json(film_category);
        }else{
            return res.status(404).json({message:'Kategorija filma nije pronađena'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.post('/',async(req,res)=>{
    const film_category=new FilmCategory(req.body);
    try{
        if(film_category){
            const newFilmCategory=await film_category.save();
            res.status(201).json(newFilmCategory);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

module.exports=router;