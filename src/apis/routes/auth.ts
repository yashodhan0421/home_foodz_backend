import express from 'express';
import { authController } from '../controllers';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/resend/otp', authController.resendOtp);
router.post('/verify/otp', authController.verifyOtp);
router.get('/getAllUsers', authController.getAllUsers);

export default router;
