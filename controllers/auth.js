import { UserModel } from "../models/User.js";

/*----@DESC POST ROUTES
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
  } catch (err) {
    console.error(err);
  }
};
