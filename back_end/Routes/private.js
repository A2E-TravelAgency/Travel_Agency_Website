import express from 'express';
import { getPrivateData } from '../Controllers/private.js';
import { protect } from '../Middleware/authentification.js'

const router = express.Router();

router.route("/").get(protect,getPrivateData);

export default router;