import express from 'express';
import ProductRouter from './ProductRouter.js';
import AdminRouter from './AdminRouter.js';
import AuthRouter from './AuthRouter.js';

const router = express.Router();

router.use('/products', ProductRouter);
router.use('/admin', AdminRouter);
router.use('/auth', AuthRouter);

export default router;
