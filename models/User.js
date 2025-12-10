import { Schema, model } from "mongoose";
import { genSalt, compare, hash } from "bcryptjs";
import { JWT_SECRET, JWT_EXPIRE } from "../config/index.js";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username field"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "please add an email"],
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
    },
    role: {
      type: String,
      enum: ["user", "publisher"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "please add password"],
      minlength: 8,
      //minimum eight characters, at least one letter, one number and one special character:
      select: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  let salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

//method for jwt
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export let UserModel = model("User", UserSchema);
