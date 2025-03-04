const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Store=require('../models/store');

router.get('/',async(req,res)=>{
    try{
        const stores=await Store.find();
        res.json(stores);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const store=await Store.findById(req.params.id);
        if(store){
            res.json(store);
        }else{
            return res.status(404).json({message:'Trgovina nije pronađena'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.post('/',async(req,res)=>{
    const store=new Store(req.body);
    try{
        if(store){
            const newStore=await store.save();
            res.status(201).json(newStore);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.put('/:id',async(req,res)=>{
    try{
        const store=await Store.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(store){
            res.json(store);
        }else{
            return res.status(404).json({message:'Trgovina nije pronađena'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const store=await Store.findByIdAndDelete(req.params.id);
        if(store){
            res.json({message:'Trgovina izbrisana'});
        }else{
            return res.status(404).json({message:'Trgovina nije pronađena'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;