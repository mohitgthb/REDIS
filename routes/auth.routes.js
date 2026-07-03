import router from 'express';
import { sendOTP, verifyOTP } from '../controllers/auth.controller.js';

router.post('/otp/send', sendOTP);
router.post('/otp/verify', verifyOTP);
router.get('/otp/:phone', getOTP);

export default router;