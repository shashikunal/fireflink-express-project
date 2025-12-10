import express from "express";
import cors from "cors";
// import { PORT } from "./config/index";
let { PORT } = await import("./config/index.js");
import dbConnection from "./config/db.js";
//call route middlewares
import { authRouter } from "./routes/authRoute.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("PUBLIC"));
app.use(express.urlencoded({ extended: true }));
let StartApp = async () => {
  //connect db'
  await dbConnection();

  //Listen a port
  app.listen(PORT, err => {
    if (err) throw err;
    console.log("Server is running on port number", PORT);
  });
};

//call router middlewares
app.use("/api/v1", authRouter);
StartApp();
