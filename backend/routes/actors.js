const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Actor=require('../models/actor');

/**
 * @swagger
 * components:
 *   schemas:
 *     Actor:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *       properties:
 *         first_name:
 *           type: string
 *           description: Ime
 *         last_name:
 *           type: string
 *           description: Prezime
 */

/**
 * @swagger
 * /glumci:
 *   get:
 *     summary: Dohvati glumce
 *     tags: [Glumci]
 *     responses:
 *       200:
 *         description: Prikaz svih glumaca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 */

router.get('/',async(req,res)=>{
    try{
        const actors=await Actor.find();
        res.json(actors);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

/**
 * @swagger
 * /glumci/{id}:
 *   get:
 *     summary: Dohvatanje glumca po ID-u
 *     tags: [Glumci]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Glumac
 *     responses:
 *       200:
 *         description: Podaci o glumcu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Glumac nije pronađen
 */

router.get('/:id',async(req,res)=>{
    try{
        const actor=await Actor.findById(req.params.id);
        if(actor){
            res.json(actor);
        }else{
            return res.status(404).json({message:'Glumac ne postoji u bazi'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

/**
 * @swagger
 * /glumci:
 *   post:
 *     summary: Kreiranje novog glumca
 *     tags: [Glumci]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Actor'
 *     responses:
 *       201:
 *         description: Glumac kreiran
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Greška u unosu podataka
 */

router.post('/',async(req,res)=>{
    const actor=new Actor(req.body);
    try{
        const newActor=await actor.save();
        res.status(201).json(newActor);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

/**
 * @swagger
 * /glumci/{id}:
 *   put:
 *     summary: Ažuriranje glumca
 *     tags: [Glumci]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID glumca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Actor'
 *     responses:
 *       200:
 *         description: Glumac ažuriran
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       404:
 *         description: Glumac nije pronađen
 */

router.put('/:id',async(req,res)=>{
    try{
        const actor=await Actor.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(actor){
            res.json(actor);
        }else{
            return res.status(404).json({message:"Glumac ne postoji u bazi"});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

/**
 * @swagger
 * /glumci/{id}:
 *   delete:
 *     summary: Brisanje glumca
 *     tags: [Glumci]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID glumca
 *     responses:
 *       200:
 *         description: Glumac izbrisan
 *       404:
 *         description: Glumac nije pronađen
 */

router.delete('/:id',async(req,res)=>{
    try{
        const actor=await Actor.findByIdAndDelete(req.params.id);
        if(actor){
            res.json({message:"Glumac je izbrisan iz baze"});
        }else{
            return res.status(404).json({message:"Glumac ne postoji u bazi"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;