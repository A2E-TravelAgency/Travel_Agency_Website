import express from 'express';
import { getPrivateData , getPrivateAdminData , changePassword , changeEmailUsername , getUsers , deleteUser , AddAdmin , getFlightData} from '../Controllers/private.js';
import { protect ,protectAdmin} from '../Middleware/authentification.js'

const router = express.Router();

router.route("/user").get(protect,getPrivateData);

router.route("/admin").get(protectAdmin,getPrivateAdminData);

router.route("/admin/changepassword").put(protectAdmin,changePassword);

router.route("/admin/changecred").put(protectAdmin,changeEmailUsername);

router.route("/admin/users").get(getUsers);

router.route("/admin/flightdata").get(getFlightData);

router.route("/admin/users/delete/:id").delete(deleteUser);

router.route("/admin/users/add").post(AddAdmin);

export default router;