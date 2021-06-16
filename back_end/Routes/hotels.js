import express from 'express';
//import { getHotels , createHotel , getHotel  } from '../Controllers/hotels.js';
import { getHotels , createHotel , getHotel  }  from '../Controllers/hotels.js';

const router = express.Router();

//router.get('/' , getHotels);
router.get('/' , getHotel);
//router.get('/' , getCity);
//router.post('/' , createHotel);


export default router;