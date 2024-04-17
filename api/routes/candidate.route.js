import express from "express";
import {
  addCandidate,
  getAllCandidates,
  getCandidateScoreByProvinceId,
  updateCandidate,
} from "../controllers/candidate.controller.js";

const router = express.Router();

router.post("/add", addCandidate);
router.get("/all", getAllCandidates);
router.post("/update", updateCandidate);
router.post("/score/province", getCandidateScoreByProvinceId);

export default router;
