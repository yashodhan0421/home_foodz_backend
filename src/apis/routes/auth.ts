import express from 'express';
import { authController } from '../controllers';

const router = express.Router();

// signup
router.post('/signup', authController.signUp);
router.get('/getAllUsers', authController.getAllUsers);

export default router;
