const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Category=require('../models/category');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Naziv kategorije
 */

/**
 * @swagger
 * /kategorije:
 *   get:
 *     summary: Dohvati kategorije
 *     tags: [Kategorije]
 *     responses:
 *       200:
 *         description: Prikaz svih kategorija
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

router.get('/',async(req,res)=>{
    try{
        const categories=await Category.find();
        res.json(categories);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

/**
 * @swagger
 * /kategorije/{id}:
 *   get:
 *     summary: Dohvatanje kategorije po ID-u
 *     tags: [Kategorije]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Kategorija
 *     responses:
 *       200:
 *         description: Podaci o kategoriji
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Kategorija nije pronađena
 */

router.get('/:id',async(req,res)=>{
    try{
        const category=await Category.findById(req.params.id);
        if(category){
            res.json(category);
        }else{
            return res.status(404).json({message:'Kategorija nije pronađena'})
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;