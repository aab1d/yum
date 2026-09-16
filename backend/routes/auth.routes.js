import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import validateUser from "../middlewares/validateUser.js";
import checkDuplicateUser from "../middlewares/checkDuplicateUser.js";
import validateLogin from "../middlewares/validateLogin.js";

const router = Router();

router.post("/register", validateUser, checkDuplicateUser, register);
router.post("/login", validateLogin, login);

export default router;
