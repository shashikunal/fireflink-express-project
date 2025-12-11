import { UserModel } from "../models/User.js";
import { JWT_COOKIE_EXPIRE, NODE_ENV } from "../config/index.js";
/*----@DESC POST ROUTES
@REGISTER
@ACCESS PUBLIC
@ROUTE /api/v1/auth/register
@ENDPOINT http://www.localhost:5000/api/v1/auth/register
@IT HAS REQUEST PAYLOAD
@CONTENT-TYPE application/json
*/

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await UserModel.create({
      username,
      email,
      password,
      role,
    });
    res.status(201).json({ message: "user successfully registered", user });
    // sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error(err);
  }
};

/*----@DESC POST ROUTES
@LOGIN
@ACCESS PUBLIC
@ROUTE /api/v1/auth/login
@ENDPOINT http://www.localhost:5000/api/v1/auth/login
@IT HAS REQUEST PAYLOAD
@CONTENT-TYPE application/json
*/

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    //custom validation check fields are empty or not
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    let user = await UserModel.findOne({ email }).select("+password");
    //check email exists or not in the database
    if (!user) {
      return res.status(400).json({
        message: "user  not exists in our database please create an account",
      });
    }
    //check password
    //fetch password from database
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(400).json({
        message: "invalid credentials || password is not matched",
      });
    }
    //send response to the user and store token
    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error(error);
  }
};

const sendTokenResponse = (user, statusCode, res) => {
  //create a token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
