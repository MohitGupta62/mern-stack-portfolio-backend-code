import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  deleteSoftware,
  getallSoftware,
  postSoftware,
} from "../controller/softwareController.js";

const router = express.Router();

router.post("/add", isAuthenticated, postSoftware);
router.delete("/delete/:id", isAuthenticated, deleteSoftware);
router.get("/getall", getallSoftware);

export default router;
