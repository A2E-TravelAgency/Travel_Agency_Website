import express from 'express';
import { getPrivateData , getPrivateAdminData , changePassword , changeEmailUsername} from '../Controllers/private.js';
import { protect ,protectAdmin} from '../Middleware/authentification.js'

const router = express.Router();

router.route("/user").get(protect,getPrivateData);

router.route("/admin").get(protectAdmin,getPrivateAdminData);


router.route("/admin/changepassword").put(protectAdmin,changePassword);


router.route("/admin/changecred").put(protectAdmin,changeEmailUsername);

export default router;