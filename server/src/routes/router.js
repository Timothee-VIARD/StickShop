import express from 'express';
import ProductRouter from './ProductRouter.js'
import AdminRouter from "./AdminRouter.js";

const router = express.Router();

router.use('/products', ProductRouter);
router.use('/admin', AdminRouter);

export default router;