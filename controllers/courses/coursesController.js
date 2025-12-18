import { CourseModel } from "../../models/CourseModel.js";
import { UserModel } from "../../models/User.js";
/* ----@DESC POST ROUTES
@method POST
@CREATECOURSE
@ACCESS PRIVATE
@ROUTE /api/v1/course/create-course
@ROLE ["publisher" , "ADMIN"]
@ENDPOINT http://www.localhost:5000/api/v1/course/create-course
@CONTENT-TYPE application/json
*/

export const CreateCourseController = async (req, res, next) => {
  try {
    const { course_title, body, avatar } = req.body;
    //fetch id
    let user = await UserModel.findById(req.user.id).select("-password");

    //save into database
    let newCourse = await CourseModel.create({
      course_title,
      body,
      avatar,
      user,
    });

    res
      .status(201)
      .json({ message: "Course has been created successfully", newCourse });
    // sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error(err);
  }
};

/* ----@DESC FETCH COURSES ROUTES
@method GET
@FETCHCOURSES
@ACCESS PUBLIC  
@ROUTE /api/v1/course/all-courses
@ROLE ["user" , "publisher" , "ADMIN"]
@ENDPOINT http://www.localhost:5000/api/v1/course/all-courses
@CONTENT-TYPE application/json
*/

export const AllCoursesController = async (req, res, next) => {
  try {
    let courses = await CourseModel.find().populate({
      path: "user",
      select: "username email role",
    });
    console.log(courses);

    res.status(200).json({
      message: "all courses fetched successfully",
      count: courses.length,
      courses,
    });
  } catch (err) {
    console.error(err);
  }
};

/* ----@DESC FETCH SINGLE COURSES ROUTES
@method GET
@FETCH  SINGLE COURSE
@ACCESS PUBLIC  
@ROUTE /api/v1/course/get-course/:id
@ROLE ["user" , "publisher" , "ADMIN"]
@ENDPOINT http://www.localhost:5000/api/v1/course/get-course/:id
@CONTENT-TYPE application/json
*/

export const getSingleCourseController = async (req, res, next) => {
  try {
    let courseId = req.params.id;
    let course = await CourseModel.findById(courseId).populate({
      path: "user",
      select: "username email role",
    });
    console.log(course);

    res.status(200).json({
      message: "course fetched successfully",
      course,
    });
  } catch (err) {
    console.error(err);
  }
};

/* ----@DESC UPDATE  COURSE ROUTES
@method GET
@UPDATE  SINGLE COURSE
@ACCESS PRIVATE  
@ROUTE /api/v1/course/update-course/:id
@ROLE [ "publisher" , "ADMIN"]
@ENDPOINT http://www.localhost:5000/api/v1/course/update-course/:id
@CONTENT-TYPE application/json
*/

export const UpdateCourseController = async (req, res, next) => {
  try {
    let courseId = req.params.id;
    let course = await CourseModel.findByIdAndUpdate(courseId, req.body, {
      new: true,
    }).populate({
      path: "user",
      select: "username email role",
    });
    console.log(course);

    res.status(200).json({
      message: "course updated successfully",
      course,
    });
  } catch (err) {
    console.error(err);
  }
};

/* ----@DESC DELETE  COURSE ROUTES
@method DELETE
@UPDATE  SINGLE COURSE
@ACCESS PRIVATE  
@ROUTE /api/v1/course/delete-course/:id
@ROLE [ "publisher" , "ADMIN"]
@ENDPOINT http://www.localhost:5000/api/v1/course/delete-course/:id
@CONTENT-TYPE application/json
*/
export const DeleteCourseController = async (req, res, next) => {
  try {
    let courseId = req.params.id;
    let course = await CourseModel.findByIdAndDelete(courseId);
    console.log(course);

    res
      .status(204)
      .json({ message: "course deleted successfully", success: true });
  } catch (err) {
    console.error(err);
  }
};

/* ----@DESC UPDATE AVATAR PROPERTY OF COURSE ROUTES
@method PATCH
@PATCH  AVATAR PROPERTY OF THE  COURSE
@ACCESS PRIVATE  
@ROUTE /api/v1/course/upload-course-avatar/:id
@ROLE [ "publisher" , "ADMIN"]
@ENDPOINT http://www.localhost:5000/api/v1/course/upload-course-avatar/:id
@CONTENT-TYPE application/json
*/
export const UPloadCourseAvatarController = async (req, res, next) => {
  try {
    let courseId = req.params.id;
    let avatarUrl = req.file; //multiple files
    console.log(req.file); //single file
    console.log(avatarUrl);
    let course = await CourseModel.findByIdAndUpdate(
      courseId,
      { avatar: avatarUrl },
      { new: true }
    ).populate({
      path: "user",
      select: "username email role",
    });
    //save into database
    res.status(200).json({
      message: "Course avatar has been updated successfully",
      course,
    });
  } catch (error) {
    console.error(error);
  }
};
