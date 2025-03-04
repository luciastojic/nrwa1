const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Payment=require('../models/payment');

router.get('/',async(req,res)=>{
    try{
        const payments=await Payment.find();
        res.json(payments);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const payment=await Payment.findById(req.params.id);
        if(payment){
            res.json(payment);
        }else{
            return res.status(404).json({message:'Plaćanje nije pronađeno'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
router.post('/',async(req,res)=>{
    const payment=new Payment(req.body);
    try{
        if(payment){
            const newPayment=await payment.save();
            res.status(201).json(newPayment);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.put('/:id',async(req,res)=>{
    try{
        const payment=await Payment.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(payment){
            res.json(payment);
        }else{
            return res.status(404).json({message:'Plaćanje nije pronađeno'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const payment=await Payment.findByIdAndDelete(req.params.id);
        if(payment){
            res.json({message:'Plaćanje izbrisano'});
        }else{
            return res.status(404).json({message:'Plaćanje nije pronađeno'})
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;