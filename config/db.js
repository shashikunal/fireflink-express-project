import { connect } from "mongoose";
import { LOCAL_MONGODB_URI, CLOUD_MONGODB_URI, NODE_ENV } from "./index.js";
const dbConnection = async () => {
  if (NODE_ENV === "production") {
    await connect(CLOUD_MONGODB_URI);
    console.log("CLOUD_MONGODB_URI" + " connected");
  } else {
    await connect(LOCAL_MONGODB_URI);
    console.log("Local mongodb" + " connected");
  }
};

export default dbConnection;
