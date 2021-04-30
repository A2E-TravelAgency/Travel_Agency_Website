import express from 'express';
import {register} from "../Controllers/auth.js"
import {login} from "../Controllers/auth.js"
import {forgotpassword} from "../Controllers/auth.js"
import {resetpassword} from "../Controllers/auth.js"
const router = express.Router();



router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

export default router;