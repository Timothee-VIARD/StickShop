import express from 'express';
import AuthService from '../services/AuthService.js';
import { logWarning } from '../errors/DisplayError.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const result = await AuthService.signUp(req.body);
    res.status(result.code || 200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(result.code || 200).json({
      message: 'Login successful',
      userId: result.id,
      username: result.username,
      role: result.role,
      token: result.token
    });
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

export default router;
