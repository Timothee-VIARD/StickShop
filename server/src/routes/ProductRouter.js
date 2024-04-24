import express from 'express';
import ProductService from '../services/ProductService.js';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const result = await ProductService.getAllProducts();
    res.status(result.code || 200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await ProductService.getProductById(req.params.id);
    res.status(result.code || 200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching product.' });
  }
});

export default router;
