import express from 'express';
import {search, addData} from "../Controllers/vols.js"
const router = express.Router();
//middleware niveau routeur
router.route("/flights").post(search);
router.route("/flightsData").post(addData);

export default router;