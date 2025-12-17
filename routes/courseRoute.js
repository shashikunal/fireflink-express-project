import { Router } from "express";

import { protect, ROLE } from "../middlewares/auth-middleware.js";
import { AllCoursesController, CreateCourseController } from "../controllers/courses/coursesController.js";
const router = Router();

router
  .route("/course/create-course")
  .post(protect, ROLE("publisher"), CreateCourseController); //protected access for the user
router.route("/course/all-courses").get(AllCoursesController); //public access for all users
export { router as courseRouter };
