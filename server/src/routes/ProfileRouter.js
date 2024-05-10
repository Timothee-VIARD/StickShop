import express from 'express';
import ProfileService from '../services/ProfileService.js';
import { logWarning } from '../errors/DisplayError.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const result = await ProfileService.getProfileByUserId(req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

router.post('/create', async (req, res) => {
  try {
    const result = await ProfileService.createProfile(req.body);
    res.status(201).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

router.post('/update', async (req, res) => {
  try {
    const result = await ProfileService.updateProfile(req.body);
    res.status(200).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

export default router;
