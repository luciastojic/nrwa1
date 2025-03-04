const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Customer=require('../models/customer');

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - store_id
 *         - first_name
 *         - last_name
 *         - email
 *         - address_id
 *       properties:
 *         store_id:
 *           type: string
 *           description: ID trgovine
 *         first_name:
 *           type: string
 *           description: Ime kupca
 *         last_name:
 *           type: string
 *           description: Prezime kupca
 *         email:
 *           type: string
 *           description: Email kupca
 *         address_id:
 *           type: string
 *           description: ID adrese kupca
 */

/**
 * @swagger
 * /kupci:
 *   get:
 *     summary: Dohvati kupce
 *     tags: [Kupci]
 *     responses:
 *       200:
 *         description: Prikaz svih kupaca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */

router.get('/',async(req,res)=>{
    try{
        const customers=await Customer.find();
        res.json(customers);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

/**
 * @swagger
 * /kupci/{id}:
 *   get:
 *     summary: Dohvatanje kupca po ID-u
 *     tags: [Kupci]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Kupac
 *     responses:
 *       200:
 *         description: Podaci o kupcu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Kupac nije pronađen
 */

router.get('/:id',async(req,res)=>{
    try{
        const customer= await Customer.findById(req.params.id);
        if(customer){
            res.json(customer);
        }else{
            return res.status(404).json({message:'Kupac nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

/**
 * @swagger
 * /kupci:
 *   post:
 *     summary: Kreiranje novog kupca
 *     tags: [Kupci]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Kupac kreiran
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Greška u unosu podataka
 */

router.post('/',async(req,res)=>{
    const customer=new Customer(req.body);
    try{
        const newCustomer=await customer.save();
        res.status(201).json(newCustomer);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

/**
 * @swagger
 * /kupci/{id}:
 *   put:
 *     summary: Ažuriranje kupca
 *     tags: [Kupci]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kupca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Kupac ažuriran
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Kupac nije pronađen
 */

router.put('/:id',async(req,res)=>{
    try{
        const customer=await Customer.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(customer){
            res.json(customer);
        }else{
            return res.status(404).json({message:'Kupac nije pronađen'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

/**
 * @swagger
 * /kupci/{id}:
 *   delete:
 *     summary: Brisanje kupca
 *     tags: [Kupci]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kupca
 *     responses:
 *       200:
 *         description: Kupac izbrisan
 *       404:
 *         description: Kupac nije pronađen
 */

router.delete('/:id',async(req,res)=>{
    try{
        const customer=await Customer.findByIdAndDelete(req.params.id);
        if(customer){
            res.json({message:'Kupac je izbrisan'});
        }else{
            return res.status(404).json({message:'Kupac nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;