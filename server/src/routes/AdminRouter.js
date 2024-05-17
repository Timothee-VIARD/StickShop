import express from 'express';
import AdminService from '../services/AdminService.js';
import MulterService from '../services/MulterService.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Administration
 *  description: API pour gérer les produits
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AdminProduct:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           description: Identifiant du produit
 *         name:
 *           type: string
 *           description: Nom du produit
 *         price:
 *           type: number
 *           description: Prix du produit
 *         description:
 *           type: string
 *           description: Description du produit
 *         category:
 *           type: string
 *           description: Catégorie du produit
 *         quantity:
 *           type: integer
 *           description: Quantité du produit
 *         inStock:
 *           type: integer
 *           description: Indique si le produit est en stock
 */

/**
 * @swagger
 * /admin:
 *  get:
 *   summary: Récupérer tous les produits
 *   tags: [Administration]
 *   description: Endpoint permettant de récupérer tous les produits sous forme de tableau d'objets
 *   responses:
 *     200:
 *       description: Récupération des produits réussie
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/AdminProduct'
 *     500:
 *       description: Erreur serveur lors de la récupération des produits
 */
router.get('/', async (req, res) => {
  try {
    const result = await AdminService.getAllProducts();
    res.status(result.code || 200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
});

/**
 * @swagger
 * /admin/{id}:
 *  get:
 *   summary: Récupérer un produit par son id
 *   tags: [Administration]
 *   description: Endpoint permettant de récupérer un produit par son id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID du produit à récupérer
 *       schema:
 *         type: integer
 *   responses:
 *     200:
 *       description: Récupération du produit réussie
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminProduct'
 *     500:
 *       description: Erreur serveur lors de la récupération du produit
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await AdminService.getProductById(req.params.id);
    res.status(result.code || 200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching product.' });
  }
});

/**
 * @swagger
 * /admin/update:
 *   post:
 *     summary: Mettre à jour un produit
 *     tags: [Administration]
 *     description: Endpoint permettant de mettre à jour un produit avec une image
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image à télécharger
 *               productId:
 *                 type: integer
 *                 description: ID du produit à mettre à jour
 *               name:
 *                 type: string
 *                 description: Nouveau nom du produit
 *               price:
 *                 type: number
 *                 description: Nouveau prix du produit
 *               description:
 *                 type: string
 *                 description: Nouvelle description du produit
 *               category:
 *                 type: string
 *                 description: Nouvelle catégorie du produit
 *               quantity:
 *                 type: integer
 *                 description: Nouvelle quantité du produit
 *               inStock:
 *                 type: integer
 *                 description: Indique si le produit est en stock
 *     responses:
 *       200:
 *         description: Mise à jour du produit réussie
 *       500:
 *         description: Erreur serveur lors de la mise à jour du produit
 */
router.post('/update', MulterService.configureMulter().single('image'), async (req, res) => {
  try {
    const result = await AdminService.updateProduct(req.body, req.file);
    res.status(200).json(result);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit dans MySQL :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du produit.' });
  }
});

export default router;
