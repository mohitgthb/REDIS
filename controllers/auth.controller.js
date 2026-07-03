import client from '../config/redis.js';
import { generateOTP } from '../utils/otp.js';

const sendOTP = async (req, res) => {

    const {phone} = req.body;

    const otp = generateOTP();

    await client.set(`otp:${phone}`, otp, {EX: 15}); 

    res.status(200).json({ message: 'OTP sent successfully' });
}

const getOTP = async (req, res) => {

    const { phone } = req.body;

    const otp = await client.get(`otp:${phone}`);

    if (!otp) {
        return res.status(400).json({ message: 'OTP not found' });
    }

    res.status(200).json({ otp });
}

const verifyOTP = async (req, res) => {

    const { phone, otp } = req.body;

    const storedOTP = await client.get(`otp:${phone}`);

    if (!storedOTP) {
        return res.status(400).json({ message: 'OTP expired or not found' });
    }

    if (storedOTP !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    await client.del(`otp:${phone}`);

    res.status(200).json({ message: 'OTP verified successfully' }); 
}



export { sendOTP, verifyOTP };