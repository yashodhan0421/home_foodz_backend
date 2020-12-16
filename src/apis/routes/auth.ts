import express from 'express';
import { authController } from '../controllers';

const router = express.Router();

// signup
router.post('/signup', authController.signUp);

export default router;
