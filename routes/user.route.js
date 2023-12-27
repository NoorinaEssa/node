import express from "express";
import { register, login, getAllUsers, getSingleUSer, updateUser, deleteSingleUser, forgetPassword, varifyOtp} from "../controllers/user.controller.js"
import { createSetting, getAllSettings } from "../controllers/settings.controller.js";
const router = express.Router();
import { authenticateWithToken } from "../middlewares/middlewares.js";


router.post("/user", register);
router.post("/user/login", login);
router.get("/user",authenticateWithToken, getAllUsers);
router.get("/user/:id", getSingleUSer)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteSingleUser)


router.post("/setting", createSetting)
router.get("/setting", getAllSettings)
router.post("/user-forget", forgetPassword);
router.post("/otp-verify", varifyOtp);
export default router;