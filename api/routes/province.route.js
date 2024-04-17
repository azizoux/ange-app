import express from "express";
import {
  addProvince,
  getAllProvines,
} from "../controllers/province.controller.js";

const router = express.Router();

router.post("/add", addProvince);
router.get("/all", getAllProvines);

export default router;
