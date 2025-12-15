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
