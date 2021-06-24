import express from 'express';
import {search} from "../Controllers/vols.js"
const router = express.Router();
//middleware niveau routeur
router.route("/flights").post(search);


export default router;