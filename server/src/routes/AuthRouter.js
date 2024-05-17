import express from 'express';
import AuthService from '../services/AuthService.js';
import { logWarning } from '../errors/DisplayError.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Authentification
 *  description: API pour gérer l'authentification
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nom d'utilisateur de l'utilisateur
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse e-mail de l'utilisateur
 *         password:
 *           type: string
 *           format: password
 *           description: Mot de passe de l'utilisateur
 *
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse e-mail de l'utilisateur
 *         password:
 *           type: string
 *           format: password
 *           description: Mot de passe de l'utilisateur
 *
 *     User:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message de succès
 *           example: Connexion réussie
 *         userId:
 *           type: integer
 *           description: Identifiant de l'utilisateur
 *           example: 1
 *         username:
 *           type: string
 *           description: Nom d'utilisateur de l'utilisateur
 *           example: JohnDoe
 *         email:
 *           type: string
 *           description: Adresse e-mail de l'utilisateur
 *           example: johndoe@gmail.com
 *         role:
 *           type: string
 *           description: Rôle de l'utilisateur
 *           example: user
 *         profilePhoto:
 *           type: string
 *           description: URL de la photo de profil de l'utilisateur
 *           example: http://example.com/profile.jpg
 *         token:
 *           type: string
 *           description: Jeton d'authentification de l'utilisateur
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Authentification]
 *     description: Endpoint permettant à un utilisateur de s'inscrire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       '200':
 *         description: Utilisateur inscrit avec succès
 *       '400':
 *         description: Requête invalide (par exemple, champs manquants ou format incorrect)
 */
router.post('/signup', async (req, res) => {
  try {
    const result = await AuthService.signUp(req.body);
    res.status(result.code || 200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Authentification]
 *     description: Endpoint permettant à un utilisateur de se connecter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Requête invalide (par exemple, champs manquants ou format incorrect)
 */
router.post('/login', async (req, res) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(result.code || 200).json({
      message: 'Login successful',
      userId: result.id,
      username: result.username,
      role: result.role,
      email: result.email,
      profilePhoto: result.profilePhoto,
      token: result.token
    });
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

export default router;
