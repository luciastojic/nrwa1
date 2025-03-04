const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Rental=require('../models/rental');

router.get('/',async(req,res)=>{
    try{
        const rentals=await Rental.find();
        res.json(rentals);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const rental=await Rental.findById(req.params.id);
        if(rental){
            res.json(rental);
        }else{
            return res.status(404).json({message:'Iznajmljivanje nije pronađeno'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.post('/',async(req,res)=>{
    const rental=new Rental(req.body);
    try{
        if(rental){
            const newRental=await rental.save();
            res.status(201).json(newRental);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.put('/:id',async(req,res)=>{
    try{
        const rental=await Rental.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(rental){
            res.json(rental);
        }else{
            return res.status(404).json({message:'Iznajmljivanje nije pronađeno'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const rental=await Rental.findByIdAndDelete(req.params.id);
        if(rental){
            res.json({message:'Izajmljivanje izbrisano'});
        }else{
            return res.status(404).json({message:'Iznajmljivanje nije pronađeno'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;