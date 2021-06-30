import express from 'express';
import { getPrivateData , getPrivateAdminData , changePassword , changeEmailUsername , getUsers , deleteUser , AddAdmin , getFlightData} from '../Controllers/private.js';
import { protect ,protectAdmin} from '../Middleware/authentification.js'

const router = express.Router();

router.route("/user").get(protect,getPrivateData);

router.route("/admin").get(protectAdmin,getPrivateAdminData);

router.route("user/changepassword").put(protect,changePassword);

router.route("/admin/changepassword").put(protectAdmin,changePassword);

router.route("/user/changecred").put(protect,changeEmailUsername);

router.route("/admin/changecred").put(protectAdmin,changeEmailUsername);

router.route("/admin/users").get(protectAdmin,getUsers);

router.route("/admin/flightdata").get(protectAdmin,getFlightData);

router.route("/admin/users/delete/:id").delete(protectAdmin,deleteUser);

router.route("/admin/users/add").post(protectAdmin,AddAdmin);

export default router;