const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const City=require('../models/city');

/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       required:
 *         - city_name
 *         - country_id
 *       properties:
 *         city_name:
 *           type: string
 *           description: Naziv grada
 *         country_id:
 *           type: string
 *           description: Id države
 */

/**
 * @swagger
 * /gradovi:
 *   get:
 *     summary: Dohvati gradove
 *     tags: [Gradovi]
 *     responses:
 *       200:
 *         description: Prikaz svih gradova
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 */

router.get('/',async(req,res)=>{
    try{
        const cities=await City.find();
        res.json(cities);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

/**
 * @swagger
 * /gradovi/{id}:
 *   get:
 *     summary: Dohvatanje gradova po ID-u
 *     tags: [Gradovi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Grad
 *     responses:
 *       200:
 *         description: Podaci o gradu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       404:
 *         description: Grad nije pronađen
 */

router.get('/:id',async(req,res)=>{
    try{
        const city=await City.findById(req.params.id);
        if(city){
            res.json(city)
        }else{
            return res.status(404).json({message:'Grad nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;