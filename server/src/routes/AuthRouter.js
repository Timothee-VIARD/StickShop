import express from 'express';
import AuthService from '../services/AuthService.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const result = await AuthService.signUp(req.body);
    res.status(result.code || 200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message || 'An error occurred while fetching products.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await AuthService.login(req.body);
    res
      .status(result.code || 200)
      .json({ message: 'Login successful', userId: result.id, username: result.username, role: result.role });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message || 'An error occurred while fetching products.' });
  }
});

export default router;
