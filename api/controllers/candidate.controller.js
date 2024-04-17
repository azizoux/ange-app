import Candidate from "../models/candidate.model.js";
import Province from "../models/province.model.js";
import Score from "../models/score.model.js";
import { errorHandler } from "../utils/error.js";

export const addCandidate = async (req, res, next) => {
  const { fullname } = req.body;
  if (!fullname || fullname === "") {
    next(errorHandler(400, "All the field are required!"));
  }
  const newCandidate = new Candidate({
    fullname,
  });
  try {
    await newCandidate.save();
    res.status(200).json({ message: "Candidate added Successfuly" });
  } catch (error) {
    next(error);
  }
};

export const getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find();
    if (!candidates) {
      return next(errorHandler(404, "No candidates found"));
    }
    return res.status(200).json({ candidates });
  } catch (error) {
    next(error);
  }
};

export const updateCandidate = async (req, res, next) => {
  const { id, newFullname } = req.body;
  console.log(req.body);
  try {
    if (!newFullname || newFullname === "") {
      next(errorHandler(500, "Candidate fullname is required"));
      return;
    }
    const newCandidate = await Candidate.findById(id);
    newCandidate.fullname = newFullname;
    newCandidate.save();
    res.status(200).json(newCandidate);
  } catch (error) {
    next(error);
  }
};

export const getCandidateScoreByProvinceId = async (req, res, next) => {
  const { candidateId, provinceId } = req.body;
  console.log({ candidateId, provinceId });
  try {
    const candidate = await Candidate.findById(candidateId);
    const province = await Province.findById(provinceId);
    console.log(province);
    const socres = await Score.find({
      candidate,
      province,
    });
    res.status(200).json(socres);
  } catch (error) {
    next(error);
  }
};
