const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Staff=require('../models/staff');

router.get('/',async(req,res)=>{
    try{
        const staffs=await Staff.find();
        res.json(staffs);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const staff=await Staff.findById(req.params.id);
        if(staff){
            res.json(staff)
        }else{
            return res.status(404).json({message:'Osoblje nije pronađeno'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.post('/',async(req,res)=>{
    const staff=new Staff(req.body);
    try{
        if(staff){
            const newStaff=await staff.save();
            res.status(201).json(newStaff);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.put('/:id',async(req,res)=>{
    try{
        const staff=await Staff.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(staff){
            res.json(staff);
        }else{
            return res.status(404).json({message:'Osoblje nije pronađeno'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const staff=await Staff.findByIdAndDelete(req.params.id);
        if(staff){
            res.json({message:'Osoblje izbrisano'});
        }else{
            return res.status(404).json({message:'Osoblje nije pronađeno'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;