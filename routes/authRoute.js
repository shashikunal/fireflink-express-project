import { Router } from "express";
import { register, login } from "../controllers/auth.js";
import { profile } from "../controllers/profile.js";
import { protect, ROLE } from "../middlewares/auth-middleware.js";
const router = Router();
router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/user/profile").get(protect, ROLE("publisher"), profile); //protected access for the user
export { router as authRouter };
