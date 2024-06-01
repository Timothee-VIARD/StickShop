import express from 'express';
import { logWarning } from '../errors/DisplayError.js';
import MailService from '../services/MailService.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Mail
 *  description: API pour gérer l'envoi d'email
 */
/**
 * @swagger
 * /mail/send:
 *   post:
 *     summary: Envoie un email
 *     tags: [Mail]
 *     description: Endpoint permettant d'envoyer un email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: Adresse email du destinataire
 *               subject:
 *                 type: string
 *                 description: Sujet de l'email
 *               text:
 *                 type: string
 *                 description: Corps de l'email
 *     responses:
 *       '200':
 *         description: Email envoyé avec succès
 *       '500':
 *         description: Erreur lors de l'envoi de l'email
 */
router.post('/send', async (req, res) => {
  try {
    const result = await MailService.sendMail(req.body.to, req.body.subject, req.body.text);
    res.status(200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

/**
 * @swagger
 * /mail/receive:
 *   post:
 *     summary: Reçoit un email
 *     tags: [Mail]
 *     description: Endpoint permettant de recevoir un email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 description: Sujet de l'email
 *               text:
 *                 type: string
 *                 description: Corps de l'email
 *     responses:
 *       '200':
 *         description: Email reçu avec succès
 *       '400':
 *         description: Erreur lors de la réception de l'email
 */
router.post('/receive', async (req, res) => {
  try {
    const result = await MailService.receiveMail(req.body.subject, req.body.text);
    res.status(200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

export default router;
