const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Language=require('../models/language');

router.get('/',async(req,res)=>{
    try{
        const languages=await Language.find();
        res.json(languages);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const language=await Language.findById(req.params.id);
        if(language){
            res.json(language);
        }else{
            return res.status(404).json({message:'Jezik filma nije pronađen'})
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;