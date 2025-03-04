const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Inventory=require('../models/inventory');

router.get('/',async(req,res)=>{
    try{
        const inventories=await Inventory.find();
        res.json(inventories);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const inventory=await Inventory.findById(req.params.id);
        if(inventory){
            res.json(inventory);
        }else{
            return res.status(404).json({message:'Popis filmova nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.post('/',async(req,res)=>{
    const inventory=new Inventory(req.body);
    try{
        if(inventory){
            const newInventory=await inventory.save();
            res.status(201).json(newInventory);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

module.exports=router;