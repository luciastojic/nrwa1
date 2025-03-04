const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Address = require('../models/address');

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - address
 *         - city_id
 *         - postal_code
 *         - phone
 *       properties:
 *         address:
 *           type: string
 *           description: Adresa
 *         city_id:
 *           type: string
 *           description: Id grada u kojem se nalazi adresa
 *         postal_code:
 *           type: integer
 *           description: Poštanski broj adrese (lokalna pošta)
 *         phone:
 *           type: string
 *           description: Lokalni telefonski broj ureda
 */

/**
 * @swagger
 * /adrese:
 *   get:
 *     summary: Dohvati adrese
 *     tags: [Adrese]
 *     responses:
 *       200:
 *         description: Prikaz adresa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */

router.get('/', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /adrese/{id}:
 *   get:
 *     summary: Dohvati adresu
 *     tags: [Adrese]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Adresa
 *     responses:
 *       200:
 *         description: Podaci o adresi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Adresa nije pronađena
 */

router.get('/:id', async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (address) {
            res.json(address);
        } else {
            return res.status(404).json({ message: 'Adresa ne postoji u bazi' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
