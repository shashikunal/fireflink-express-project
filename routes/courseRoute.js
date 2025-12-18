import { Router } from "express";

import { upload } from "../util/multer.js";

import { protect, ROLE } from "../middlewares/auth-middleware.js";
import {
  AllCoursesController,
  CreateCourseController,
  DeleteCourseController,
  getSingleCourseController,
  UpdateCourseController,
  UPloadCourseAvatarController,
} from "../controllers/courses/coursesController.js";
const router = Router();

router
  .route("/course/create-course")
  .post(protect, ROLE("publisher"), CreateCourseController); //protected access for the user
router.route("/course/all-courses").get(AllCoursesController); //public access for all users
router.route("/course/get-course/:id").get(getSingleCourseController); //public access for all users
router
  .route("/course/update-course/:id")
  .put(protect, ROLE("publisher", "admin"), UpdateCourseController);
router
  .route("/course/delete-course/:id")
  .delete(protect, ROLE("publisher", "admin"), DeleteCourseController);
router
  .route("/course/upload-course-avatar/:id")
  .put(
    upload.single("avatar"),
    protect,
    ROLE("publisher", "admin"),
    UPloadCourseAvatarController
  );
export { router as courseRouter };
