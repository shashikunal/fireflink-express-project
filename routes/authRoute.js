import { Router } from "express";
import { register } from "../controllers/auth.js";
const router = Router();
router.route("/auth/register").post(register);
export { router as authRouter };
