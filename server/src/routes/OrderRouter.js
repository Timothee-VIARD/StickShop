import express from 'express';
import OrderService from '../services/OrderService.js';
import { logWarning } from '../errors/DisplayError.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API pour récupérer les commandes
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant de la commande
 *         orderNumber:
 *           type: string
 *           description: Numéro de la commande
 *         userId:
 *            type: integer
 *            description: Identifiant de l'utilisateur
 *         orderDate:
 *            type: string
 *            description: Date de la commande
 *         deliveryDate:
 *            type: string
 *            description: Date de livraison de la commande
 *         address:
 *            type: string
 *            description: Adresse de livraison de la commande
 *         city:
 *            type: string
 *            description: Ville de livraison de la commande
 *         zipCode:
 *            type: string
 *            description: Code postal de livraison de la commande
 *         country:
 *            type: string
 *            description: Pays de livraison de la commande
 *         paymentMethod:
 *            type: string
 *            description: Méthode de paiement de la commande
 *         totalPrice:
 *            type: string
 *            description: Total de la commande
 *         status:
 *            type: string
 *            description: Statut de la commande
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Récupérer toutes les commandes
 *     tags: [Orders]
 *     description: Endpoint permettant de récupérer toutes les commandes
 *     responses:
 *       200:
 *         description: Récupération des commandes réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erreur serveur lors de la récupération des commandes
 */
router.get('/', async (req, res) => {
  try {
    const result = await OrderService.getAll();
    res.status(result.code || 200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: Créer une commande
 *     tags: [Orders]
 *     description: Endpoint permettant de créer une commande
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Création de la commande réussie
 *       500:
 *         description: Erreur serveur lors de la récupération des commandes
 */
router.post('/create', async (req, res) => {
  try {
    const result = await OrderService.create(req.body);
    res.status(result.code || 200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

/**
 * @swagger
 * /orders/user/{id}:
 *  get:
 *    summary: Récupérer les commandes d'un utilisateur
 *    tags: [Orders]
 *    description: Endpoint permettant de récupérer les commandes d'un utilisateur
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Identifiant de l'utilisateur
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Récupération des commandes de l'utilisateur réussie
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Order'
 *      500:
 *        description: Erreur serveur lors de la récupération des commandes de l'utilisateur
 */
router.get('/user/:id', async (req, res) => {
  try {
    const result = await OrderService.getOrdersByUserId(req.params.id);
    res.status(result.code || 200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *    summary: Récupérer une commande par son ID
 *    tags: [Orders]
 *    description: Endpoint permettant de récupérer une commande par son ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID de la commande à récupérer
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Récupération de la commande réussie
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      404:
 *        description: Commande non trouvée
 *      500:
 *        description: Erreur serveur lors de la récupération de la commande
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await OrderService.getOrderById(req.params.id);
    res.status(result.code || 200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

//update
/**
 * @swagger
 * /orders/updateStatus/{id}:
 *  put:
 *    summary: Mettre à jour le statut d'une commande par son ID
 *    tags: [Orders]
 *    description: Endpoint permettant de mettre à jour le statut d'une commande par son ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID de la commande à mettre à jour
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             status:
 *               type: string
 *               description: Statut de la commande
 *    responses:
 *      200:
 *        description: Mise à jour du statut de la commande réussie
 *      400:
 *        description: Commande non trouvée
 *      500:
 *        description: Erreur serveur lors de la mise à jour du statut de la commande
 */
router.put('/updateStatus/:id', async (req, res) => {
  try {
    const result = await OrderService.updateStatusOrderById(req.params.id, req.body);
    res.status(result?.code || 200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *  delete:
 *    summary: Supprimer une commande par son ID
 *    tags: [Orders]
 *    description: Endpoint permettant de supprimer une commande par son ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID de la commande à supprimer
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Suppression de la commande réussie
 *      400:
 *        description: Commande non trouvée
 *      500:
 *        description: Erreur serveur lors de la suppression de la commande
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await OrderService.deleteOrderById(req.params.id);
    res.status(result?.code || 200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

export default router;
