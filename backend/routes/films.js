const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Film=require('../models/film');

/**
 * @swagger
 * components:
 *   schemas:
 *     Film:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - release_year
 *         - lagnuage
 *         - original_language
 *         - rental_duration
 *         - rental_rate
 *         - length
 *         - replacment_cost
 *         - rating
 *         - special_features
 *       properties:
 *         title:
 *           type: string
 *           description: Naziv filma
 *         description:
 *           type: string
 *           description: Opis radnje
 *         release_year:
 *           type: integer
 *           description: Godina izdanja
 *         language:
 *           type: string
 *           description: ID jezika prijevoda
 *         original_language:
 *           type: string
 *           description: ID originalnog jezika
 *         rental_duration:
 *           type: integer
 *           description: Vrijeme trajanja filma
 *         rental_rate:
 *           type: integer
 *           description: ID adrese kupca
 *         length:
 *           type: integer
 *           description: Vrijeme trajanja iznajmljivanja filma
 *         replacment_cost:
 *           type: integer
 *           description: Cijena iznajmljivanja
 *         rating:
 *           type: integer
 *           description: Ocjena filma
 *         special_features:
 *           type: string
 *           description: Specijalne značajke
 */

/**
 * @swagger
 * /filmovi:
 *   get:
 *     summary: Dohvati filmove
 *     tags: [Filmovi]
 *     responses:
 *       200:
 *         description: Prikaz svih filmova
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 */

router.get('/',async(req,res)=>{
    try{
        const films=await Film.find();
        res.json(films);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

/**
 * @swagger
 * /filmovi/{id}:
 *   get:
 *     summary: Dohvatanje filma po ID-u
 *     tags: [Filmovi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Film
 *     responses:
 *       200:
 *         description: Podaci o filmu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       404:
 *         description: Film nije pronađen
 */

router.get('/:id',async(req,res)=>{
    try{
        const film=await Film.findById(req.params.id);
        if(film){
            res.json(film);
        }else{
            return res.status(404).json({message:'Film nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

/**
 * @swagger
 * /filmovi:
 *   post:
 *     summary: Kreiranje novog filma
 *     tags: [Filmovi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       201:
 *         description: Film kreiran
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       400:
 *         description: Greška u unosu podataka
 */

router.post('/',async(req,res)=>{
    const film=new Film(req.body);
    try{
        if(film){
            const newFilm=await film.save();
            res.status(201).json(newFilm);
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

/**
 * @swagger
 * /filmovi/{id}:
 *   put:
 *     summary: Ažuriranje filma
 *     tags: [Filmovi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID filma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       200:
 *         description: Film ažuriran
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       404:
 *         description: Film nije pronađen
 */

router.put('/:id',async(req,res)=>{
    try{
        const film=await Film.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(film){
            res.json(film);
        }else{
            return res.status(404).json({message:'Film nije pronađen'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

/**
 * @swagger
 * /filmovi/{id}:
 *   delete:
 *     summary: Brisanje filma
 *     tags: [Filmovi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID filma
 *     responses:
 *       200:
 *         description: Film izbrisan
 *       404:
 *         description: Film nije pronađen
 */

router.delete('/:id',async(req,res)=>{
    try{
        const film=await Film.findByIdAndDelete(req.params.id);
        if(film){
            res.json({message:'Film je izbrisan'});
        }else{
            return res.status(404).json({message:'Film nije pronađen'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;