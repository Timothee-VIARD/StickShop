import express from "express";
import AdminService from "../services/AdminService.js";

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const result = await AdminService.getAllProducts();
        res.status(result.code || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await AdminService.getProductById(req.params.id);
        res.status(result.code || 200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching product.' });
    }
});

router.post('/upload', AdminService.configureMulter().single('image'), async (req, res) => {
    try {
        const result = await AdminService.updateProduct(req.body, req.file);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit dans MySQL :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du produit.' });
    }
});

export default router;