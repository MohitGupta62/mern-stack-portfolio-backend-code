import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addNewProject,
  deleteProject,
  getallProject,
  getSingleProject,
  updateProject,
} from "../controller/projectController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/getall", getallProject);
router.get("/getall/:id", getSingleProject);

export default router;
