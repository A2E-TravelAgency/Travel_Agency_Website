import express from 'express';
import { getHotels , createHotel } from '../Controllers/hotels.js';
const router = express.Router();

router.get('/' , getHotels);
router.post('/' , createHotel);


export default router;