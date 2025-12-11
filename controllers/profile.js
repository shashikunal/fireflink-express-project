import { UserModel } from "../models/User.js";

/*----@DESC POST ROUTES
@method GET
@PROFILE
@ACCESS PRIVATE
@ROUTE /api/v1/user/profile
@ENDPOINT http://www.localhost:5000/api/v1/user/profile
@CONTENT-TYPE application/json
*/
export const profile = async (req, res, next) => {
  try {
    let profileData = await UserModel.findOne({ _id: req.user.id });
    console.log(profileData);
    res.status(200).json({
      success: true,
      message: "successfully profile fetched",
      payload: profileData,
    });
  } catch (error) {
    console.error(error);
  }
};
