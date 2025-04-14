import express from "express";
import { getStudentById } from "../Controller/studentDetailController.js";

const router = express.Router();

router.get("/studentDetail/:id", getStudentById);

export default router;
