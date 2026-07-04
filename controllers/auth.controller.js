import client from '../config/redis.js';
import { generateOTP } from '../utils/otp.js';

const sendOTP = async (req, res) => {

    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ message: 'phone is required' });
    }

    const otp = generateOTP();

    await client.set(`otp:${phone}`, otp, {EX: 30}); 

    res.status(200).json({ message: 'OTP sent successfully' , otp: otp});
}

const getOTP = async (req, res) => {

    const phone = req.params.phone || req.query.phone || req.body?.phone;

    if (!phone) {
        return res.status(400).json({ message: 'phone is required' });
    }

    const otp = await client.get(`otp:${phone}`);

    if (!otp) {
        return res.status(404).json({ message: 'OTP not found' });
    }

    res.status(200).json({ otp });
}

const verifyOTP = async (req, res) => {

    const phone = req.body.phone || req.query.phone || req.params.phone;
    const otp = req.body.otp || req.query.otp;

    if (!phone || !otp) {
        return res.status(400).json({ message: 'phone and otp are required' });
    }

    const storedOTP = await client.get(`otp:${phone}`);

    if (!storedOTP) {
        return res.status(404).json({ message: 'OTP expired or not found' });
    }

    if (storedOTP !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    await client.del(`otp:${phone}`);

    res.status(200).json({ message: 'OTP verified successfully' }); 
}



export { sendOTP, verifyOTP, getOTP };