import express from 'express';
import ProductService from '../services/ProductService.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API pour récupérer les produits
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
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
 *         image:
 *           type: string
 *           description: URL de l'image du produit
 *         description:
 *           type: string
 *           description: Description du produit
 *         category:
 *           type: string
 *           description: Catégorie du produit
 *         quantity:
 *           type: integer
 *           description: Quantité du produit
 *         rating:
 *           type: number
 *           description: Note moyenne du produit
 *         reviews:
 *           type: integer
 *           description: Nombre d'avis sur le produit
 *         inStock:
 *           type: integer
 *           description: Indique si le produit est en stock
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Products]
 *     description: Endpoint permettant de récupérer tous les produits
 *     responses:
 *       200:
 *         description: Récupération des produits réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erreur serveur lors de la récupération des produits
 */
router.get('/', async (req, res) => {
  try {
    const result = await ProductService.getAllProducts();
    res.status(result.code || 200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     tags: [Products]
 *     description: Endpoint permettant de récupérer un produit par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Récupération du produit réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération du produit
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await ProductService.getProductById(req.params.id);
    res.status(result.code || 200).json(result);
  } catch (error) {
    console.error(error);
    if (error.code === 404) {
      res.status(404).json({ error: 'Produit non trouvé.' });
    } else {
      res.status(500).json({ error: 'An error occurred while fetching product.' });
    }
  }
});

/**
 * @swagger
 * /products/updateQuantity/{id}:
 *   put:
 *     summary: Mettre à jour la quantité d'un produit
 *     tags: [Products]
 *     description: Endpoint permettant de mettre à jour la quantité d'un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Nouvelle quantité du produit
 *     responses:
 *       200:
 *         description: Quantité du produit mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Requête incorrecte
 *       500:
 *         description: Erreur serveur lors de la mise à jour de la quantité du produit
 */
router.put('/updateQuantity/:id', async (req, res) => {
  try {
    const result = await ProductService.updateProductQuantity(req.params.id, req.body.quantity);
    res.status(result.code || 200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating product quantity.' });
  }
});

export default router;
