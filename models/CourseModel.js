import { model, Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    course_title: {
      type: String,
      required: [true, "course title is required"],
    },
    body: {
      type: String,
      required: [true, "course body  is required"],
    },
    avatar: {
      type: [""],
      default:
        "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const course = model("course", CourseSchema);

export { course as CourseModel };
