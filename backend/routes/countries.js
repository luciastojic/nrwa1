const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Country=require('../models/country');

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - country_name
 *       properties:
 *         country_name:
 *           type: string
 *           description: Naziv drzave
 */

/**
 * @swagger
 * /drzave:
 *   get:
 *     summary: Dohvati drzave
 *     tags: [Drzave]
 *     responses:
 *       200:
 *         description: Prikaz svih drzava
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 */

router.get('/',async(req,res)=>{
    try{
        const countries=await Country.find();
        res.json(countries);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

/**
 * @swagger
 * /drzave/{id}:
 *   get:
 *     summary: Dohvatanje drzava po ID-u
 *     tags: [Drzave]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Drzava
 *     responses:
 *       200:
 *         description: Podaci o drzavi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       404:
 *         description: Drzava nije pronađena
 */

router.get('/:id',async(req,res)=>{
    try{
        const country=await Country.findById(req.params.id);
        if(country){
            res.json(country);
        }else{
            return res.status(404).json({message:'Država nije pronađena'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;