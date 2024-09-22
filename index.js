import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnetion from "./database/dbConnetion.js";
import cloudinary from "cloudinary";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./routes/messageRoute.js";
import userRouter from "./routes/userRoutes.js";
import timelineRouter from "./routes/timelineRoute.js";
import softwareApplicationRouter from "./routes/softwareApplicationRoute.js";
import skillRouter from "./routes/skillRoute.js";
import projectRouter from "./routes/projectRoute.js";
const app = express();

dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 4000;

// -----------cros--------------
app.use(
  cors({
    origin: [process.env.PortFolio_URL, process.env.DashBoard_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------Ye File Upload karne ke liye use karte hai like:multer jaisa-----------------
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

dbConnetion();
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});
