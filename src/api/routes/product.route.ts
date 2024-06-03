import { Router } from 'express';
const router = Router();

import { productsFetchController } from '../controllers/product.controller';

router.get('/all', productsFetchController);

export default router;