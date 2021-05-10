import express from 'express';
import {register} from "../Controllers/authentification.js"
import {login} from "../Controllers/authentification.js"
import {forgotpassword} from "../Controllers/authentification.js"
import {resetpassword} from "../Controllers/authentification.js"
const router = express.Router();
//middleware niveau routeur



router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/passwordreset/:resetToken").put(resetpassword);


export default router;