import { Router } from 'express';
const router = Router();

import { logInPostController, logoutPostController, signUpPostController } from '../controllers/auth.controller';
import { isAuthenticated, isNotAuthenticated } from '../../middlewares/isAuthenticated.middleware';

router.post('/signup', isNotAuthenticated, signUpPostController);
router.post('/login', isNotAuthenticated, logInPostController);
router.post('/logout', isAuthenticated, logoutPostController);

export default router;