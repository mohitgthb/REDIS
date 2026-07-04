import { Router } from 'express';
import { sendOTP, verifyOTP, getOTP } from '../controllers/auth.controller.js';

const router = Router();

router.post('/otp/send', sendOTP);
router.post('/otp/verify', verifyOTP);
router.get('/otp/:phone', getOTP);

export default router;