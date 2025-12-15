import { Router } from "express";

import { protect, ROLE } from "../middlewares/auth-middleware.js";
import { CreateCourseController } from "../controllers/courses/coursesController.js";
const router = Router();

router
  .route("/course/create-course")
  .post(protect, ROLE("publisher"), CreateCourseController); //protected access for the user
export { router as courseRouter };
