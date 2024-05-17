import express from 'express';
import ProfileService from '../services/ProfileService.js';
import { logInfo, logWarning } from '../errors/DisplayError.js';
import MulterService from '../services/MulterService.js';

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

router.post('/create', MulterService.configureMulter().single('image'), async (req, res) => {
  try {
    const result = await ProfileService.createProfile(req.body, req.file);
    res.status(201).json(result);
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

router.post('/update', MulterService.configureMulter().single('image'), async (req, res) => {
  try {
    const result = await ProfileService.updateProfile(req.body, req.file);
    res.status(200).json(result);
    logInfo('Profile updated');
  } catch (error) {
    logWarning(`${error.code} - ${error.message}`);
    res.status(400).json({ error: error.code });
  }
});

export default router;
