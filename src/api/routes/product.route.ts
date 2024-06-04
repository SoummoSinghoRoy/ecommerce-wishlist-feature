import { Router } from 'express';
const router = Router();

import { productsFetchController, wishlistAddPostController } from '../controllers/product.controller';
import { isAuthenticated } from '../../middlewares/isAuthenticated.middleware';

router.get('/all', productsFetchController);
router.post('/wishlist/add/:itemId', isAuthenticated, wishlistAddPostController);

export default router;