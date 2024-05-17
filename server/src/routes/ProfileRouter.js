import express from 'express';
import ProfileService from '../services/ProfileService.js';
import { logInfo, logWarning } from '../errors/DisplayError.js';
import MulterService from '../services/MulterService.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API pour gérer les profils utilisateurs
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant du profil
 *         user_id:
 *           type: integer
 *           description: Identifiant de l'utilisateur
 *         firstName:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         lastName:
 *           type: string
 *           description: Nom de l'utilisateur
 *         address:
 *           type: string
 *           description: Adresse de l'utilisateur
 *         phone:
 *           type: string
 *           description: Numéro de téléphone de l'utilisateur
 *         image:
 *           type: string
 *           description: URL de l'image du profil de l'utilisateur
 */

/**
 * @swagger
 * /profile/{userId}:
 *   get:
 *     summary: Récupérer le profil d'un utilisateur par son ID
 *     tags: [Profile]
 *     description: Endpoint permettant de récupérer le profil d'un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur dont on veut récupérer le profil
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profil utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Erreur lors de la récupération du profil
 */
router.get('/:userId', async (req, res) => {
  try {
    const result = await ProfileService.getProfileByUserId(req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

/**
 * @swagger
 * /profile/create:
 *   post:
 *     summary: Créer un nouveau profil utilisateur
 *     tags: [Profile]
 *     description: Endpoint permettant de créer un nouveau profil utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       201:
 *         description: Profil utilisateur créé avec succès
 *       400:
 *         description: Erreur lors de la création du profil
 */
router.post('/create', MulterService.configureMulter().single('image'), async (req, res) => {
  try {
    const result = await ProfileService.createProfile(req.body, req.file);
    res.status(201).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

/**
 * @swagger
 * /profile/update:
 *   post:
 *     summary: Mettre à jour le profil utilisateur
 *     tags: [Profile]
 *     description: Endpoint permettant de mettre à jour le profil utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profil utilisateur mis à jour avec succès
 *       400:
 *         description: Erreur lors de la mise à jour du profil
 */
router.post('/update', MulterService.configureMulter().single('image'), async (req, res) => {
  try {
    const result = await ProfileService.updateProfile(req.body, req.file);
    res.status(200).json(result);
    logInfo('Profile updated');
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

export default router;
